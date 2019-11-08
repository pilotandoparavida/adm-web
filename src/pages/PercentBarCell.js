import * as React from 'react';
import * as PropTypes from 'prop-types';
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

const PercentBarCellBase = ({ value, style, row }) => {
    let percent = value * 100;
    if (row.hasOwnProperty('vagas')) {
        percent = value*100/row.vagas;
    }
    return (
        <TableCell
            style={style}
        >
            <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={percent}
            >
                percent
            </BorderLinearProgress>
        </TableCell>
    );
};

PercentBarCellBase.propTypes = {
    value: PropTypes.number.isRequired,
    row: PropTypes.object,
    style: PropTypes.object,
};
PercentBarCellBase.defaultProps = {
    style: {},
};

export const PercentBarCell = PercentBarCellBase;