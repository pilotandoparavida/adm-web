import React from 'react';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import {
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';

function DataOnGrid (props) {
    return (
        <>
            <h1>{props.title}</h1>
            <Grid
                rows={props.rows}
                columns={props.columns}
                columnExtensions={props.tableColumnExtensions}>
                <SortingState
                // defaultSorting={props.sorting}
                />
                <IntegratedSorting />
                <PagingState
                    defaultCurrentPage={0}
                    pageSize={10}
                />
                <IntegratedPaging />
                <Table />
                <TableHeaderRow showSortingControls />
                <PagingPanel />
            </Grid>
        </>
    );
}

export default DataOnGrid;