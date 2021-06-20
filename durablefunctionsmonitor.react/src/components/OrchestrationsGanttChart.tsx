import * as React from 'react';
import { observer } from 'mobx-react';

import {
    Box, Button, Toolbar, Typography
} from '@material-ui/core';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import { ResultsGanttDiagramTabState } from '../states/ResultsGanttDiagramTabState';
import { SaveAsSvgButton, getStyledSvg } from './SaveAsSvgButton';
import { IBackendClient } from '../services/IBackendClient';

import { CustomTabStyle } from '../theme';

// Orchestrations Gantt chart view
@observer
export class OrchestrationsGanttChart extends React.Component<{ state: ResultsGanttDiagramTabState, inProgress: boolean, fileName: string, backendClient: IBackendClient }> {

    componentDidUpdate() {

        // Mounting click handlers to diagram nodes
        const svgElement = document.getElementById('mermaidSvgId');

        if (!!svgElement) {

            this.mountClickEventToFunctionNodes(svgElement.getElementsByClassName('task'));
            this.mountClickEventToFunctionNodes(svgElement.getElementsByClassName('taskText'));
            this.mountClickEventToFunctionNodes(svgElement.getElementsByClassName('taskTextOutsideLeft'));
            this.mountClickEventToFunctionNodes(svgElement.getElementsByClassName('taskTextOutsideRight'));
        }
    }

    render(): JSX.Element {

        const state = this.props.state;

        if (!state.rawHtml) {
            return null;
        }

        return (<>

            <div
                className="raw-html-div"
                style={CustomTabStyle}
                dangerouslySetInnerHTML={{ __html: getStyledSvg(state.rawHtml) }}
            />

            <Toolbar variant="dense">

                <Typography style={{ flex: 1 }} />

                <Button
                    variant="outlined"
                    color="default"
                    disabled={this.props.inProgress}
                    onClick={() => window.navigator.clipboard.writeText(state.diagramCode)}
                >
                    <FileCopyIcon />
                    <Box width={10} />
                    <Typography color="inherit">Copy diagram code to Clipboard</Typography>
                </Button>

                <Box width={20} />

                <SaveAsSvgButton
                    svg={getStyledSvg(state.rawHtml)}
                    fileName={this.props.fileName}
                    inProgress={this.props.inProgress}
                    backendClient={this.props.backendClient}
                />

                <Box width={20} />
            </Toolbar>
        </>);
    }

    private mountClickEventToFunctionNodes(nodes: HTMLCollection): void {

        const state = this.props.state;

        for (var i = 0; i < nodes.length; i++) {
            const el = nodes[i] as HTMLElement;

            el.onclick = () => state.goto(parseInt(el.id.substr(4)));
            el.style.cursor = 'pointer';
        }
    }
}