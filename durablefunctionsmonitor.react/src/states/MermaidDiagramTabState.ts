import { observable, computed } from 'mobx';
import mermaid from 'mermaid';

import { ICustomTabState } from './ICustomTabState';
import { DurableOrchestrationStatus } from '../states/DurableOrchestrationStatus';

// Base class for all mermaid diagram tab states
export abstract class MermaidDiagramTabState implements ICustomTabState {

    readonly name: string = "Diagram";
    readonly isMermaidDiagram: boolean = true;

    @computed
    get description(): string { return this._diagramCode; };

    @computed
    get rawHtml(): string { return this._diagramSvg; };

    constructor(protected _loadDetails: (orchestrationId: string) => Promise<DurableOrchestrationStatus>) {
    }

    load(details: DurableOrchestrationStatus) : Promise<void> {

        // Only doing this on demand, just in case
        if (!MermaidDiagramTabState._mermaidInitialized) {

            mermaid.initialize({
                startOnLoad: true,
                sequence: {
                    noteMargin: 0,
                    boxMargin: 5,
                    boxTextMargin: 5
                }
            });
            MermaidDiagramTabState._mermaidInitialized = true;
        }

        if (!details.historyEvents) {
            return Promise.resolve();
        }

        return this.buildDiagram(details);
    }

    @observable
    protected _diagramCode: string;
    @observable
    protected _diagramSvg: string;

    private static _mermaidInitialized = false;

    protected abstract buildDiagram(details: DurableOrchestrationStatus): Promise<void>;
}

export function formatDuration(durationInMs: number): string {

    var result = '';
    if (isNaN(durationInMs) || (durationInMs < 0)) {
        return result;
    }

    const days = Math.floor(durationInMs / 86400000);
    if (days > 30) {
        // something went wrong...
        return result;
    }

    var c = 0;

    if (days > 0) {
        result += days.toFixed(0) + 'd';
        ++c;
        durationInMs = durationInMs % 86400000;
    }

    const hours = Math.floor(durationInMs / 3600000);
    if (hours > 0) {
        result += hours.toFixed(0) + 'h';

        if (++c > 1) {
            return `(${result})`;
        }
        
        durationInMs = durationInMs % 3600000;
    }

    const minutes = Math.floor(durationInMs / 60000);
    if (minutes > 0) {
        result += minutes.toFixed(0) + 'm';

        if (++c > 1) {
            return `(${result})`;
        }

        durationInMs = durationInMs % 60000;
    }

    const seconds = Math.floor(durationInMs / 1000);
    if (seconds > 0) {
        result += seconds.toFixed(0) + 's';

        if (++c > 1) {
            return `(${result})`;
        }

        durationInMs = durationInMs % 1000;
    }

    if (durationInMs > 0) {
        result += durationInMs.toFixed(0) + 'ms';
    }

    if (!result) {
        result = '0ms';
    }

    return `(${result})`;
}

export function formatDateTime(timestamp: string): string {

    return timestamp.substr(0, 23);
}

export function formatDurationInSeconds(durationInMs: number): string {

    return Math.round(durationInMs / 1000).toFixed(0) + 's';
}

