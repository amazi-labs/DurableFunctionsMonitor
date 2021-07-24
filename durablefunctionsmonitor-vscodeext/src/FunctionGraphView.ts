import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { MonitorView } from './MonitorView';
import { FunctionGraphList } from './FunctionGraphList';

// Represents the function graph view
export class FunctionGraphView
{
    constructor(private _context: vscode.ExtensionContext,
        private _functionProjectPath: string,
        private _functionGraphList: FunctionGraphList) {
        
        this._staticsFolder = path.join(this._context.extensionPath, 'backend', 'DfmStatics');

        this._webViewPanel = this.showWebView();
    }

    // Closes this web view
    cleanup(): void {

        if (!!this._webViewPanel) {
            this._webViewPanel.dispose();
        }
    }

    // Path to html statics
    private _staticsFolder: string;

    // Reference to the already opened WebView with the main page
    private _webViewPanel: vscode.WebviewPanel | null = null;    

    // Functions and proxies currently shown
    private _functionsAndProxies: { [name: string]: { filePath?: string, pos?: number } } = {};

    private static readonly ViewType = 'durableFunctionsMonitorFunctionGraph';

    // Opens a WebView with function graph page in it
    private showWebView(): vscode.WebviewPanel {

        const title = `Functions Graph (${this._functionProjectPath})`;

        const panel = vscode.window.createWebviewPanel(
            FunctionGraphView.ViewType,
            title,
            vscode.ViewColumn.One,
            {
                retainContextWhenHidden: true,
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(this._staticsFolder)]
            }
        );

        var html = fs.readFileSync(path.join(this._staticsFolder, 'index.html'), 'utf8');
        html = MonitorView.fixLinksToStatics(html, this._staticsFolder, panel.webview);

        html = this.embedTheme(html);
        html = this.embedParams(html, !!this._functionProjectPath);

        panel.webview.html = html;

        // handle events from WebView
        panel.webview.onDidReceiveMessage(request => {

            switch (request.method) {
                case 'SaveAs':

                    // Just to be extra sure...
                    if (!MonitorView.looksLikeSvg(request.data)) {
                        vscode.window.showErrorMessage(`Invalid data format. Save failed.`);
                        return;
                    }
                    
                    // Saving some file to local hard drive
                    vscode.window.showSaveDialog({ filters: { 'SVG Images': ['svg'] } }).then(filePath => {

                        if (!filePath || !filePath.fsPath) { 
                            return;
                        }

                        fs.writeFile(filePath!.fsPath, request.data, err => {
                            if (!err) {
                                vscode.window.showInformationMessage(`Saved to ${filePath!.fsPath}`);
                            } else {
                                vscode.window.showErrorMessage(`Failed to save. ${err}`);
                            }
                        });
                    });
                    return;
                case 'TraverseFunctionProject':

                    if (!this._functionProjectPath) {
                        return;
                    }

                    const requestId = request.id;
                    this._functionGraphList.traverseFunctions(this._functionProjectPath).then(result => {

                        this._functionsAndProxies = {};
                        for (const name in result.functions) {
                            this._functionsAndProxies[name] = result.functions[name];
                        }
                        for (const name in result.proxies) {
                            this._functionsAndProxies['proxy.' + name] = result.proxies[name];
                        }

                        const iconsSvg = fs.readFileSync(path.join(this._staticsFolder, 'static', 'icons', 'all-azure-icons.svg'), 'utf8');

                        panel.webview.postMessage({
                            id: requestId, data: {
                                functions: result.functions,
                                proxies: result.proxies,
                                iconsSvg
                            }
                        });

                    }, err => {
                        // err might fail to serialize here, so passing err.message only
                        panel.webview.postMessage({ id: requestId, err: { message: err.message } });
                    });

                    return;
                case 'GotoFunctionCode':

                    const func = this._functionsAndProxies[request.url];
                    if (!!func && !!func.filePath) {
                        
                        vscode.window.showTextDocument(vscode.Uri.file(func.filePath)).then(ed => {

                            const pos = ed.document.positionAt(!!func.pos ? func.pos : 0);

                            ed.selection = new vscode.Selection(pos, pos);
                            ed.revealRange(new vscode.Range(pos, pos));
                        });
                    }

                    return;
            }

        }, undefined, this._context.subscriptions);

        return panel;
    }

    // Embeds the current color theme
    private embedTheme(html: string): string {

        if ([2, 3].includes((vscode.window as any).activeColorTheme.kind)) {
            return html.replace('<script>var DfmClientConfig={}</script>', '<script>var DfmClientConfig={\'theme\':\'dark\'}</script>');
        }
        return html;
    }

    // Embeds some other parameters in the HTML served
    private embedParams(html: string, isFunctionGraphAvailable: boolean): string {
        return html
            .replace(
                `<script>var OrchestrationIdFromVsCode="",IsFunctionGraphAvailable=0,StateFromVsCode={}</script>`,
                `<script>var OrchestrationIdFromVsCode="",IsFunctionGraphAvailable=${!!isFunctionGraphAvailable ? 1 : 0},StateFromVsCode={}</script>`
            )
            .replace(
                `<script>var DfmViewMode=0</script>`,
                `<script>var DfmViewMode=1</script>`
            );
    }
}