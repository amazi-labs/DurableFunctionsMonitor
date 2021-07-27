import { observable, computed } from 'mobx';
import mermaid from 'mermaid';

import { IBackendClient } from '../services/IBackendClient';
import { buildFunctionDiagramCode } from './az-func-as-a-graph/buildFunctionDiagramCode';
import { FunctionGraphStateBase } from './FunctionGraphStateBase';

// State of FunctionGraph view
export class FunctionGraphState extends FunctionGraphStateBase {

    @observable
    errorMessage: string = '';

    @computed
    get inProgress(): boolean { return this._inProgress; };

    @computed
    get functionsLoaded(): boolean { return !!this._traversalResult; };

    @computed
    get renderFunctions(): boolean { return this._renderFunctions; };
    set renderFunctions(val: boolean) {
        this._renderFunctions = val;
        this.render();
    };

    @computed
    get renderProxies(): boolean { return this._renderProxies; };
    set renderProxies(val: boolean) {
        this._renderProxies = val;
        this.render();
    };
    
    constructor(backendClient: IBackendClient) {
        super(backendClient);
    }

    render() {
        
        this._diagramCode = '';
        this._diagramSvg = '';
        this.errorMessage = '';

        if (!this._traversalResult) {
            return;
        }

        this._inProgress = true;
        try {
            const diagramCode = buildFunctionDiagramCode(this._traversalResult.functions, this._traversalResult.proxies,
                {
                    doNotRenderFunctions: !this._renderFunctions,
                    doNotRenderProxies: !this._renderProxies
                });

            if (!diagramCode) {
                this._inProgress = false;
                return;
            }

            this._diagramCode = `graph LR\n${diagramCode}`;

            mermaid.render('mermaidSvgId', this._diagramCode, (svg) => {

                this._diagramSvg = this.applyIcons(svg);

                this._inProgress = false;
            });

        } catch (err) {
            this.errorMessage = `Failed to render: ${err.message}`;
            this._inProgress = false;
        }
    }

    load() {

        if (this._inProgress) {
            return;
        }

        // Only doing this on demand, just in case
        this.initMermaidWhenNeeded();

        this._inProgress = true;
        this.errorMessage = '';
        this._diagramCode = '';
        this._diagramSvg = '';
        this._traversalResult = null;

        this._backendClient.call('TraverseFunctionProject', '').then(response => {

            this._traversalResult = response;
            this.render();

        }, err => {
            this._inProgress = false;
            this.errorMessage = `Failed to traverse: ${err.message}.${(!!err.response ? err.response.data : '')} `;
        });
    }

    @observable
    private _inProgress: boolean = false;
}