import * as React from 'react';
import { observer } from 'mobx-react';

import { Grid, TextField } from '@material-ui/core';

import { DurableOrchestrationStatus } from '../../states/DurableOrchestrationStatus';
import { RuntimeStatusToStyle } from '../../theme';
import { LongJsonDialog } from '../dialogs/LongJsonDialog';

// Fields for detailed durable entity view
@observer
export class DurableEntityFields extends React.Component<{ details: DurableOrchestrationStatus }> {

    render(): JSX.Element {
        const details = this.props.details;

        const runtimeStatusStyle = RuntimeStatusToStyle(details.runtimeStatus);

        return (<>
            <Grid container className="grid-container">
                <Grid item xs={12} sm={12} md={3} zeroMinWidth className="grid-item">
                    <TextField
                        label="entityId.name"
                        value={details.entityId?.name}
                        margin="normal"
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} zeroMinWidth className="grid-item">
                    <TextField
                        label="entityId.key"
                        value={details.entityId?.key}
                        margin="normal"
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={2} zeroMinWidth className="grid-item">
                    <TextField
                        label="createdTime"
                        value={details.createdTime}
                        margin="normal"
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2} zeroMinWidth className="grid-item">
                    <TextField
                        label="lastUpdatedTime"
                        value={details.lastUpdatedTime}
                        margin="normal"
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2} zeroMinWidth className="grid-item">
                    <TextField
                        label="runtimeStatus"
                        value={details.runtimeStatus}
                        margin="normal"
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        style={runtimeStatusStyle}
                    />
                </Grid>
                
                <Grid item xs={12} zeroMinWidth className="grid-item">
                    <TextField
                        label="input"
                        value={LongJsonDialog.formatJson(details.input)}
                        margin="normal"
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        multiline
                        rowsMax={10}
                    />
                </Grid>
                <Grid item xs={12} zeroMinWidth className="grid-item">
                    <TextField
                        label="customStatus"
                        value={LongJsonDialog.formatJson(details.customStatus)}
                        margin="normal"
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        multiline
                        rowsMax={10}
                    />
                </Grid>
            </Grid>

        </>);
    }
}