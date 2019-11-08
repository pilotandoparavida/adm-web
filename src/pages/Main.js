import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import './Main.css'
import {
    SortingState, EditingState, PagingState, SummaryState,
    IntegratedPaging, IntegratedSorting, IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table, TableHeaderRow, TableEditRow, TableEditColumn,
    PagingPanel, DragDropProvider, TableColumnReordering,
    TableFixedColumns, TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';

import ListTurma from './Utils'

import { ProgressBarCell } from '../theme-sources/material-ui/components/progress-bar-cell';
import { HighlightedCell } from '../theme-sources/material-ui/components/highlighted-cell';
import { PercentTypeProvider } from '../theme-sources/material-ui/components/percent-type-provider';

const styles = theme => ({
    lookupEditCell: {
        padding: theme.spacing(1),
    },
    dialog: {
        width: 'calc(100% - 16px)',
    },
    inputRoot: {
        width: '100%',
    },
    selectMenu: {
        position: 'absolute !important',
    },
});

const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
        <Button
            color="primary"
            onClick={onExecute}
            title="Create new row"
        >
            New
      </Button>
    </div>
);

const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Edit row">
        <EditIcon />
    </IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton
        onClick={() => {
            // eslint-disable-next-line
            if (window.confirm('Are you sure you want to delete this row?')) {
                onExecute();
            }
        }}
        title="Delete row"
    >
        <DeleteIcon />
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Save changes">
        <SaveIcon />
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
        <CancelIcon />
    </IconButton>
);

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};

const LookupEditCellBase = ({
    availableColumnValues, value, onValueChange, classes,
}) => (
        <TableCell
            className={classes.lookupEditCell}
        >
            <Select
                value={value}
                onChange={event => onValueChange(event.target.value)}
                MenuProps={{
                    className: classes.selectMenu,
                }}
                input={(
                    <Input
                        classes={{ root: classes.inputRoot }}
                    />
                )}
            >
                {availableColumnValues.map(item => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </TableCell>
    );
export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

const Cell = (props) => {
    const { column } = props;
    if (column.name === 'discount') {
        return <ProgressBarCell {...props} />;
    }
    if (column.name === 'amount') {
        return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

const EditCell = (props) => {
    return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;

export default function Main({ history }) {
    const [login] = useState(
        localStorage.getItem('@admfrontendppv/login') || ''
    );
    const [hash] = useState(
        localStorage.getItem('@admfrontendppv/hash') || ''
    );

    const [columns] = useState([
        { name: 'data', title: 'Data' },
        { name: 'descricao', title: 'Descrição' },
        { name: 'vagas', title: 'Vagas' },
        { name: 'totalinscritos', title: 'Inscritos' },
        { name: 'confirmado', title: 'Confirmados' },
        { name: 'transferido', title: 'Transferidos' },
        { name: 'concluido', title: 'Concluído' },
        { name: 'faltoso', title: 'Faltoso' },
    ]);
    const [rows, setRows] = useState([]);
    const [tableColumnExtensions] = useState([
        { columnName: 'data', width: 180, align: 'center' },
        { columnName: 'descricao', width: 250, align: 'right' },
        { columnName: 'vagas', width: 180, align: 'center' },
        { columnName: 'totalinscritos', width: 180, align: 'center' },
        { columnName: 'confirmado', width: 180, align: 'center' },
        { columnName: 'concluido', width: 180, align: 'center' },
        { columnName: 'faltoso', width: 180, align: 'center' },
        { columnName: 'transferido', width: 180, align: 'center' },
    ]);
    const [sorting, getSorting] = useState([]);
    const [editingRowIds, getEditingRowIds] = useState([]);
    const [addedRows, setAddedRows] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [pageSizes] = useState([5, 10, 0]);
    const [columnOrder, setColumnOrder] = useState(['data', 'descricao', 'vagas', 'totalinscritos', 'confirmado', 'concluido', 'faltoso', 'transferido']);
    const [percentColumns] = useState(['totalinscritos', 'confirmado', 'concluido', 'faltoso']);
    const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);
    const [totalSummaryItems] = useState([
        { columnName: 'concluido', type: 'sum' },
        { columnName: 'totalinscritos', type: 'sum' },
        { columnName: 'faltoso', type: 'sum' },
        { columnName: 'confirmado', type: 'sum' },
        { columnName: 'transferido', type: 'sum' },
    ]);

    const changeAddedRows = value => setAddedRows(
        value.map(row => (Object.keys(row).length ? row : {
            amount: 0,
            discount: 0,
            saleDate: new Date().toISOString().split('T')[0],
        })),
    );

    const deleteRows = (deletedIds) => {
        const rowsForDelete = rows.slice();
        deletedIds.forEach((rowId) => {
            const index = rowsForDelete.findIndex(row => row.id === rowId);
            if (index > -1) {
                rowsForDelete.splice(index, 1);
            }
        });
        return rowsForDelete;
    };

    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            changedRows = deleteRows(deleted);
        }
        setRows(changedRows);
    };

    useEffect(() => {
        if (login === '' || hash === '' || hash === undefined || login === undefined) {
            localStorage.removeItem('@admfrontendppv/login');
            localStorage.removeItem('@admfrontendppv/hash');
            if (history) history.push('/login');
        }
    }, [login, hash, history]);

    function handleLogout() {
        localStorage.removeItem('@admfrontendppv/login');
        localStorage.removeItem('@admfrontendppv/hash');
        if (history) history.push('/login');
    }

    async function ShowTurmas() {
        setRows(await ListTurma());
    }

    function ShowAlunos() {

    }

    return (
        <>
            <div className="container">
                <img src={logo} style={{ 'cursor': 'pointer' }} alt="Pilotando para Vida" className="logo" onClick={() =>
                    handleLogout()} />
                <div className="content">
                    <div style={{ 'display': 'flex', 'flexDirection': 'row' }}>
                        <button style={{ 'margin': '5px' }} onClick={ShowTurmas}>
                            Turma
                        </button>
                        <button style={{ 'margin': '5px' }} onClick={ShowAlunos}>
                            Aluno
                        </button>
                    </div>
                </div>
            </div>
            <div className="data" id="data">
                <Paper>
                    <Grid
                        rows={rows}
                        columns={columns}
                        getRowId={getRowId}
                    >
                        <SortingState
                            sorting={sorting}
                            onSortingChange={getSorting}
                        />
                        <PagingState
                            currentPage={currentPage}
                            onCurrentPageChange={setCurrentPage}
                            pageSize={pageSize}
                            onPageSizeChange={setPageSize}
                        />
                        <EditingState
                            editingRowIds={editingRowIds}
                            onEditingRowIdsChange={getEditingRowIds}
                            rowChanges={rowChanges}
                            onRowChangesChange={setRowChanges}
                            addedRows={addedRows}
                            onAddedRowsChange={changeAddedRows}
                            onCommitChanges={commitChanges}
                        />
                        <SummaryState
                            totalItems={totalSummaryItems}
                        />

                        <IntegratedSorting />
                        <IntegratedPaging />
                        <IntegratedSummary />

                        <PercentTypeProvider for={percentColumns} />

                        <DragDropProvider />

                        <Table
                            columnExtensions={tableColumnExtensions}
                            cellComponent={Cell}
                        />
                        <TableColumnReordering
                            order={columnOrder}
                            onOrderChange={setColumnOrder}
                        />
                        <TableHeaderRow showSortingControls />
                        <TableEditRow
                            cellComponent={EditCell}
                        />
                        <TableEditColumn
                            width={170}
                            showAddCommand={!addedRows.length}
                            showEditCommand
                            showDeleteCommand
                            commandComponent={Command}
                        />
                        <TableSummaryRow />
                        <TableFixedColumns
                            leftColumns={leftFixedColumns}
                        />
                        <PagingPanel
                            pageSizes={pageSizes}
                        />
                    </Grid>
                </Paper>
            </div>
        </>
    );
}

/// https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/
/// https://devexpress.github.io/devextreme-reactive/react/grid/

// css: https://material-ui.com/pt/components/grid/