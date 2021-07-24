import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

import * as SharedConstants from './SharedConstants';

import { BackendProcess, StorageConnectionSettings } from './BackendProcess';
import { ConnStringUtils } from './ConnStringUtils';
import { Settings } from './Settings';
import { FunctionGraphList } from './FunctionGraphList';

// Represents the main view, along with all detailed views
export class MonitorView
{
    // Storage Connection settings (connString and hubName) of this Monitor View
    get storageConnectionSettings(): StorageConnectionSettings {
        return new StorageConnectionSettings(this._backend.storageConnectionStrings, this._hubName);
    }

    get isVisible(): boolean {
        return !!this._webViewPanel;
    }

    // Path to html statics
    get staticsFolder(): string {
        return path.join(this._backend.binariesFolder, 'DfmStatics');
    }

    constructor(private _context: vscode.ExtensionContext,
        private _backend: BackendProcess,
        private _hubName: string,
        private _functionGraphList: FunctionGraphList,
        private _onViewStatusChanged: () => void) {
        
        const ws = vscode.workspace;
        if (!!ws.rootPath && fs.existsSync(path.join(ws.rootPath, 'host.json'))) {
            this._functionProjectPath = ws.rootPath;
        }
    }

    // Closes all WebViews
    cleanup(): void {

        for (var childPanel of this._childWebViewPanels) {
            childPanel.dispose();
        }
        this._childWebViewPanels = [];

        if (!!this._webViewPanel) {
            this._webViewPanel.dispose();
        }
    }

    // Shows or makes active the main view
    show(messageToWebView: any = undefined): Promise<void> {

        if (!!this._webViewPanel) {
            // Didn't find a way to check whether the panel still exists. 
            // So just have to catch a "panel disposed" exception here.
            try {

                this._webViewPanel.reveal();
                if (!!messageToWebView) {
                    // BUG: WebView might actually appear in 3 states: disposed, visible and inactive.
                    // Didn't find the way to distinguish the last two. 
                    // But when it is inactive, it will be activated with above reveal() method,
                    // and then miss this message we're sending here. No good solution for this problem so far...
                    this._webViewPanel.webview.postMessage(messageToWebView);
                }

                return Promise.resolve();
            } catch (err) {
                this._webViewPanel = null;
            }
        }

        return new Promise<void>((resolve, reject) => {

            this._backend.getBackend().then(() => {

                try {
                    this._webViewPanel = this.showWebView('', messageToWebView);

                    this._webViewPanel.onDidDispose(() => {
                        this._webViewPanel = null;
                        this._onViewStatusChanged();
                    });

                    resolve();
                } catch (err) {
                    reject(`WebView failed: ${err}`);
                }
                
            }, reject);
        });
    }

    // Permanently deletes all underlying Storage resources for this Task Hub
    deleteTaskHub(): Promise<void> {

        if (!this._backend.backendUrl) {
            return Promise.reject('Backend is not started');
        }

        const headers: any = {};
        headers[SharedConstants.NonceHeaderName] = this._backend.backendCommunicationNonce;

        return new Promise<void>((resolve, reject) => {

            const url = `${this._backend.backendUrl}/${this._hubName}/delete-task-hub`;
            axios.post(url, {}, { headers }).then(() => {
                this.cleanup();
                resolve();
            }, err => reject(err.message));
        });
    }

    // Handles 'Goto instanceId...' context menu item
    gotoInstanceId() {

        this.askForInstanceId().then(instanceId => {

            // Opening another WebView
            this._childWebViewPanels.push(this.showWebView(instanceId));
        });
    }

    // Converts script and CSS links
    static fixLinksToStatics(originalHtml: string, pathToBackend: string, webView: vscode.Webview): string {

        var resultHtml: string = originalHtml;

        const regex = / (href|src)="\/([0-9a-z.\/]+)"/ig;
        var match: RegExpExecArray | null;
        while (match = regex.exec(originalHtml)) {

            const relativePath = match[2];
            const localPath = path.join(pathToBackend, relativePath);
            const newPath = webView.asWebviewUri(vscode.Uri.file(localPath)).toString();

            resultHtml = resultHtml.replace(`/${relativePath}`, newPath);
        }

        return resultHtml;
    }

    // Validates incoming SVG, just to be extra sure...
    static looksLikeSvg(data: string): boolean {
        return data.startsWith('<svg') && data.endsWith('</svg>') && !data.includes('<script');
    }

    // Reference to the already opened WebView with the main page
    private _webViewPanel: vscode.WebviewPanel | null = null;    

    // Reference to all child WebViews
    private _childWebViewPanels: vscode.WebviewPanel[] = [];

    // Functions and proxies currently shown
    private _functionsAndProxies: { [name: string]: { filePath?: string, pos?: number } } = {};

    private _functionProjectPath: string = '';

    private static readonly ViewType = 'durableFunctionsMonitor';
    private static readonly GlobalStateName = MonitorView.ViewType + 'WebViewState';

    // Opens a WebView with main page or orchestration page in it
    private showWebView(orchestrationId: string = '', messageToWebView: any = undefined): vscode.WebviewPanel {

        const title = (!!orchestrationId) ?
            `Instance '${orchestrationId}'`
            :
            `Durable Functions Monitor (${this.taskHubFullTitle})`;

        const panel = vscode.window.createWebviewPanel(
            MonitorView.ViewType,
            title,
            vscode.ViewColumn.One,
            {
                retainContextWhenHidden: true,
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(this.staticsFolder)]
            }
        );

        var html = fs.readFileSync(path.join(this.staticsFolder, 'index.html'), 'utf8');
        html = MonitorView.fixLinksToStatics(html, this.staticsFolder, panel.webview);

        // Also passing persisted settings via HTML
        const webViewState = this._context.globalState.get(MonitorView.GlobalStateName, {});

        html = this.embedOrchestrationIdAndState(html, !!this._functionProjectPath, orchestrationId, webViewState);
        html = this.embedThemeAndSettings(html);

        panel.webview.html = html;

        // handle events from WebView
        panel.webview.onDidReceiveMessage(request => {

            switch (request.method) {
                case 'IAmReady':
                    // Sending an initial message (if any), when the webView is ready
                    if (!!messageToWebView) {
                        panel.webview.postMessage(messageToWebView);
                        messageToWebView = undefined;
                    }
                    return;
                case 'PersistState':
                    // Persisting state values
                    const webViewState = this._context.globalState.get(MonitorView.GlobalStateName, {}) as any;
                    webViewState[request.key] = request.data;
                    this._context.globalState.update(MonitorView.GlobalStateName, webViewState);
                    return;
                case 'OpenInNewWindow':
                    // Opening another WebView
                    this._childWebViewPanels.push(this.showWebView(request.url));
                    return;
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

                        const iconsSvg = fs.readFileSync(path.join(this.staticsFolder, 'static', 'icons', 'all-azure-icons.svg'), 'utf8');

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
                case 'VisualizeFunctionsAsAGraph':

                    const ws = vscode.workspace;
                    if (!!ws.rootPath && fs.existsSync(path.join(ws.rootPath, 'host.json'))) {
                        this._functionGraphList.visualizeProjectPath(ws.rootPath);
                    }

                    return;
            }

            // Then it's just a propagated HTTP request
            const requestId = request.id;

            const headers: any = {};
            headers[SharedConstants.NonceHeaderName] = this._backend.backendCommunicationNonce;

            axios.request({
                url: `${this._backend.backendUrl}/${this._hubName}${request.url}`,
                method: request.method,
                data: request.data,
                headers
            }).then(response => {

                panel.webview.postMessage({ id: requestId, data: response.data });
            }, err => {

                panel.webview.postMessage({ id: requestId, err });
            });

        }, undefined, this._context.subscriptions);

        return panel;
    }

    // Embeds the current color theme
    private embedThemeAndSettings(html: string): string {

        const theme = [2, 3].includes((vscode.window as any).activeColorTheme.kind) ? 'dark' : 'light';

        return html.replace('<script>var DfmClientConfig={}</script>',
            `<script>var DfmClientConfig={'theme':'${theme}','showTimeAs':'${Settings().showTimeAs}'}</script>`);
    }

    // Embeds the orchestrationId in the HTML served
    private embedOrchestrationIdAndState(html: string, isFunctionGraphAvailable: boolean, orchestrationId: string, state: any): string {
        return html.replace(
            `<script>var OrchestrationIdFromVsCode="",IsFunctionGraphAvailable=0,StateFromVsCode={}</script>`,
            `<script>var OrchestrationIdFromVsCode="${orchestrationId}",IsFunctionGraphAvailable=${!!isFunctionGraphAvailable ? 1 : 0},StateFromVsCode=${JSON.stringify(state)}</script>`
        );
    }

    private askForInstanceId(): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            var instanceId = '';
            const instanceIdPick = vscode.window.createQuickPick();

            instanceIdPick.onDidHide(() => instanceIdPick.dispose());

            instanceIdPick.onDidChangeSelection(items => {
                if (!!items && !!items.length) {
                    instanceId = items[0].label;
                }
            });

            // Still allowing to type free text
            instanceIdPick.onDidChangeValue(value => {
                instanceId = value;

                // Loading suggestions from backend
                if (instanceId.length > 1) {
                    this.getInstanceIdSuggestions(instanceId).then(suggestions => {

                        instanceIdPick.items = suggestions.map(id => {
                            return { label: id };
                        });
                    });
                } else {
                    instanceIdPick.items = [];
                }
            });

            instanceIdPick.onDidAccept(() => {
                if (!!instanceId) {
                    resolve(instanceId);
                }
                instanceIdPick.hide();
            });

            instanceIdPick.title = `(${this.taskHubFullTitle}) instanceId to go to:`;

            instanceIdPick.show();
            // If nothing is selected, leaving the promise unresolved, so nothing more happens
        });
    }

    // Human-readable TaskHub title in form '[storage-account]/[task-hub]'
    private get taskHubFullTitle(): string {

        return `${ConnStringUtils.GetStorageName(this._backend.storageConnectionStrings)}/${this._hubName}`;
    }

    // Returns orchestration/entity instanceIds that start with prefix
    private getInstanceIdSuggestions(prefix: string): Promise<string[]> {

        const headers: any = {};
        headers[SharedConstants.NonceHeaderName] = this._backend.backendCommunicationNonce;

        return axios.get(`${this._backend.backendUrl}/${this._hubName}/id-suggestions(prefix='${prefix}')`, { headers })
            .then(response => {
                return response.data as string[];
            });
    }
}