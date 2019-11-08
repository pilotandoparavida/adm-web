import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { lighten, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#F58D50', 0.8),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#F58D50',
    },
})(LinearProgress);

const PercentBarCellBase = ({ value, style, row, ...restProps }) => {
    let percent = value * 100;
    if (row.hasOwnProperty('vagas')) {
        percent = value*100/row.vagas;
    }
    return (
        <TableCell
            {...restProps}
        >
            <center>{value} ({percent.toFixed(2)}%)</center>
            <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={percent}
            />
        </TableCell>
    );
};

export const PercentBarCell = PercentBarCellBase;