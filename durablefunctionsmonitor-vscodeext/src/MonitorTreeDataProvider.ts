import * as vscode from 'vscode';

import { MonitorView } from "./MonitorView";
import { MonitorViewList } from "./MonitorViewList";
import { StorageAccountTreeItem } from './StorageAccountTreeItem';
import { StorageAccountTreeItems } from './StorageAccountTreeItems';
import { TaskHubTreeItem } from './TaskHubTreeItem';
import { SubscriptionTreeItems } from './SubscriptionTreeItems';
import { SubscriptionTreeItem } from './SubscriptionTreeItem';
import { FunctionGraphList } from './FunctionGraphList';

// Root object in the hierarchy. Also serves data for the TreeView.
export class MonitorTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> { 

    constructor(context: vscode.ExtensionContext, functionGraphList: FunctionGraphList, logChannel?: vscode.OutputChannel) {

        this._monitorViews = new MonitorViewList(context,
            functionGraphList,
            () => this._onDidChangeTreeData.fire(),
            !logChannel ? () => { } : (l) => logChannel.append(l));

        const resourcesFolderPath = context.asAbsolutePath('resources');
        this._storageAccounts = new StorageAccountTreeItems(resourcesFolderPath, this._monitorViews);

        // Using Azure Account extension to connect to Azure, get subscriptions etc.
        const azureAccountExtension = vscode.extensions.getExtension('ms-vscode.azure-account');

        // Typings for azureAccount are here: https://github.com/microsoft/vscode-azure-account/blob/master/src/azure-account.api.d.ts
        const azureAccount = !!azureAccountExtension ? azureAccountExtension.exports : undefined;
        
        if (!!azureAccount && !!azureAccount.onFiltersChanged) {

            // When user changes their list of filtered subscriptions (or just relogins to Azure)...
            context.subscriptions.push(azureAccount.onFiltersChanged(() => this.refresh()));
        }

        this._subscriptions = new SubscriptionTreeItems(
            context,
            azureAccount,
            this._storageAccounts,
            () => this._onDidChangeTreeData.fire(),
            resourcesFolderPath,
            !logChannel ? () => { } : (l) => logChannel.appendLine(l)
        );

        // Also trying to parse current project's files and create a Task Hub node for them
        const connSettingsFromCurrentProject = this._monitorViews.getStorageConnectionSettingsFromCurrentProject();
        if (!!connSettingsFromCurrentProject) {
            this._storageAccounts.addNodeForConnectionSettings(connSettingsFromCurrentProject);
        }
    }

    // Does nothing, actually
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem { return element; }

    // Returns the children of `element` or root if no element is passed.
    getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {

        if (!element) {
            return this._subscriptions.getNonEmptyNodes();
        }

        const subscriptionNode = element as SubscriptionTreeItem;
        if (subscriptionNode.isSubscriptionTreeItem) {

            const storageAccountNodes = subscriptionNode.storageAccountNodes;

            // Initially collapsing those storage nodes, that don't have attached TaskHubs at the moment
            for (const n of storageAccountNodes) {
                if (!n.isAttached) {
                    n.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
                }
            }

            return Promise.resolve(storageAccountNodes);
        }

        // If this is a storage account tree item
        const item = element as StorageAccountTreeItem;
        if (this._storageAccounts.nodes.includes(item)) {
            return Promise.resolve(item.childItems);
        }

        return Promise.resolve([]);
    }

    // Handles 'Attach' context menu item or a click on a tree node
    attachToTaskHub(taskHubItem: TaskHubTreeItem | null, messageToWebView: any = undefined): void {

        if (!!this._inProgress) {
            console.log(`Another operation already in progress...`);
            return;
        }

        // This could happen, if the command is executed via Command Palette (and not via menu)
        if (!taskHubItem) {
            this.createOrActivateMonitorView(false, messageToWebView);
            return;
        }

        this._inProgress = true;
        const monitorView = this._monitorViews.getOrCreateFromStorageConnectionSettings(taskHubItem.storageConnectionSettings);

        monitorView.show(messageToWebView).then(() => {

            this._onDidChangeTreeData.fire();
            this._inProgress = false;

        }, (err: any) => {
            // .finally() doesn't work here - vscode.window.showErrorMessage() blocks it until user 
            // closes the error message. As a result, _inProgress remains true until then, which blocks all commands

            this._inProgress = false;
            vscode.window.showErrorMessage(err);
        });
    }

    // Handles 'Detach' context menu item
    detachFromTaskHub(storageAccountItem: StorageAccountTreeItem) {

        if (!storageAccountItem) {
            vscode.window.showInformationMessage('This command is only available via context menu');
            return;
        }

        if (!!this._inProgress) {
            console.log(`Another operation already in progress...`);
            return;
        }
        this._inProgress = true;

        this._monitorViews.detachBackend(storageAccountItem.storageConnStrings).then(() => {

            this._onDidChangeTreeData.fire();
            this._inProgress = false;

        }, err => {
            this._inProgress = false;
            vscode.window.showErrorMessage(`Failed to detach from Task Hub. ${err}`);
        });
    }

    // Handles 'Delete Task Hub' context menu item
    deleteTaskHub(taskHubItem: TaskHubTreeItem) {

        if (!taskHubItem) {
            vscode.window.showInformationMessage('This command is only available via context menu');
            return;
        }

        if (!!this._inProgress) {
            console.log(`Another operation already in progress...`);
            return;
        }

        const monitorView = this._monitorViews.getOrCreateFromStorageConnectionSettings(taskHubItem.storageConnectionSettings);
        if (!monitorView) {
            console.log(`Tried to delete a detached Task Hub`);
            return;
        }
        
        const prompt = `This will permanently delete all Azure Storage resources used by '${taskHubItem.label}' orchestration service. There should be no running Function instances for this Task Hub present. Are you sure you want to proceed?`;
        vscode.window.showWarningMessage(prompt, 'Yes', 'No').then(answer => {

            if (answer === 'Yes') {

                this._inProgress = true;
                monitorView.deleteTaskHub().then(() => { 

                    taskHubItem.removeFromTree();

                    this._onDidChangeTreeData.fire();
                    this._inProgress = false;

                }, (err) => { 
                    this._inProgress = false;
                    vscode.window.showErrorMessage(`Failed to delete Task Hub. ${err}`);
                });
            }
        });
    }

    // Handles 'Attach' button
    attachToAnotherTaskHub() {

        this.createOrActivateMonitorView(true);
    }

    // Handles 'Refresh' button
    refresh() {
        this._subscriptions.cleanup();
        this._onDidChangeTreeData.fire();
    }

    // Handles 'Detach from all Task Hubs' button
    detachFromAllTaskHubs() {

        if (!!this._inProgress) {
            console.log(`Another operation already in progress...`);
            return;
        }
        this._inProgress = true;

        this.cleanup().catch(err => {
            vscode.window.showErrorMessage(`Failed to detach from Task Hub. ${err}`);
        }).finally(() => {
            this._onDidChangeTreeData.fire();
            this._inProgress = false;
        });
    }
    
    // Handles 'Go to instanceId...' context menu item
    gotoInstanceId(taskHubItem: TaskHubTreeItem | null) {

        // Trying to get a running backend instance.
        // If the relevant MonitorView is currently not visible, don't want to show it - that's why all the custom logic here.
        var monitorView = !taskHubItem ?
            this._monitorViews.firstOrDefault() :
            this._monitorViews.getOrCreateFromStorageConnectionSettings(taskHubItem.storageConnectionSettings);

        if (!!monitorView) {

            monitorView.gotoInstanceId();

        } else {

            this.createOrActivateMonitorView(false).then(view => {
                if (!!view) {

                    // Not sure why this timeout here is needed, but without it the quickPick isn't shown
                    setTimeout(() => {
                        view.gotoInstanceId();
                    }, 1000);
                }
            });
        }
    }

    // Stops all backend processes and closes all views
    cleanup(): Promise<any> {
        return this._monitorViews.cleanup();
    }

    private _inProgress: boolean = false;

    private _monitorViews: MonitorViewList;
    private _storageAccounts: StorageAccountTreeItems;
    private _subscriptions: SubscriptionTreeItems;

    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined> = new vscode.EventEmitter<StorageAccountTreeItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined> = this._onDidChangeTreeData.event;

    // Shows or makes active the main view
    private createOrActivateMonitorView(alwaysCreateNew: boolean, messageToWebView: any = undefined): Promise<MonitorView | null> {

        if (!!this._inProgress) {
            console.log(`Another operation already in progress...`);
            return Promise.resolve(null);
        }

        return new Promise<MonitorView>((resolve, reject) => {

            this._monitorViews.getOrAdd(alwaysCreateNew).then(monitorView => {

                this._inProgress = true;

                monitorView.show(messageToWebView).then(() => {

                    this._storageAccounts.addNodeForMonitorView(monitorView);
                    this._onDidChangeTreeData.fire();
                    this._inProgress = false;

                    resolve(monitorView);

                }, (err) => {
                    // .finally() doesn't work here - vscode.window.showErrorMessage() blocks it until user 
                    // closes the error message. As a result, _inProgress remains true until then, which blocks all commands
                    this._inProgress = false;
                    vscode.window.showErrorMessage(err);
                });

            }, vscode.window.showErrorMessage);
        });
    }
}