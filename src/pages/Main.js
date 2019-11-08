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
import CircularProgress from '@material-ui/core/CircularProgress';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';

import {PercentBarCell} from './PercentBarCell'
import {EstadoCell} from './EstadoCell'
import ListTurma from './ListTurma'
import ListAluno from './ListAluno';

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
            title="Criar"
        >
            Adicionar
      </Button>
    </div>
);

const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Editar">
        <EditIcon />
    </IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton
        onClick={() => {
            // eslint-disable-next-line
            if (window.confirm('Você tem certeza que deseja deletar este item?')) {
                onExecute();
            }
        }}
        title="Delete row"
    >
        <DeleteIcon />
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Salvar alterações">
        <SaveIcon />
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancelar alterações">
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
    const [loadingTurma, setLoadingTurma] = useState(false);
    const [loadingAluno, setLoadingAluno] = useState(false);
    const [rowsAluno, setRowsAluno] = useState([]);
    const [rowsTurma, setRowsTurma] = useState([]);
    const [typeData, setTypeData] = useState('');
    const [sorting, getSorting] = useState([]);
    const [editingRowIds, getEditingRowIds] = useState([]);
    const [addedRows, setAddedRows] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [pageSizes] = useState([5, 10, 0]);
    const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);

    const [columns, setColumns] = useState([]);    
    const [rows, setRows] = useState([]);
    const [tableColumnExtensions, setTableColumnExtensions] = useState([]);
    const [columnOrder, setColumnOrder] = useState([]);    
    const [percentBar, setPercentBar] = useState({});
    const [totalSummaryItems, setTotalSummaryItems] = useState([]);

    const Cell = (props) => {
        const { column } = props;        

        if (typeData === "Turma") {
            if (percentBar.hasOwnProperty(column.name)) {
                if (props.row.hasOwnProperty('descricao')) {
                    if (props.row.descricao === "ESPERA") {
                        return <Table.Cell {...props} />;
                    }
                }
                return <PercentBarCell {...props} />;
            }
        } else { // Aluno
            if (column.name === "estado") {
                return <EstadoCell {...props} />
            }
        }

        return <Table.Cell {...props} />;
    };

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

    useEffect (() => { // executa uma única vez
        async function fetchData () {
            setLoadingAluno(true);
            setLoadingTurma(true);
            setRowsTurma(await ListTurma());
            setLoadingTurma(false);
            setRowsAluno(await ListAluno());
            setLoadingAluno(false);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

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
        setLoadingTurma(true);
        setTypeData('Turma');
        setRows([]);
        setTableColumnExtensions([
            { columnName: 'data', width: 100, align: 'center' },
            { columnName: 'descricao', width: 150, align: 'left' },
            { columnName: 'vagas', width: 100, align: 'center' },
            { columnName: 'totalinscritos', width: 130, align: 'center' },
            { columnName: 'confirmado', width: 140, align: 'center' },
            { columnName: 'concluido', width: 130, align: 'center' },
            { columnName: 'faltoso', width: 130, align: 'center' },
            { columnName: 'transferido', width: 130, align: 'center' },
        ]);
        setColumns([
            { name: 'data', title: 'Data' },
            { name: 'descricao', title: 'Descrição' },
            { name: 'vagas', title: 'Vagas' },
            { name: 'totalinscritos', title: 'Inscrito' },
            { name: 'confirmado', title: 'Confirmado' },
            { name: 'transferido', title: 'Transferido' },
            { name: 'concluido', title: 'Concluído' },
            { name: 'faltoso', title: 'Faltoso' },
        ]);
        setColumnOrder(['data', 'descricao', 'vagas', 'totalinscritos', 'confirmado', 'concluido', 'faltoso', 'transferido']);
        setPercentBar({ confirmado: true, totalinscritos: true, concluido: true, faltoso: true, transferido: true });
        setTotalSummaryItems([
            { columnName: 'concluido', type: 'sum' },
            { columnName: 'totalinscritos', type: 'sum' },
            { columnName: 'faltoso', type: 'sum' },
            { columnName: 'confirmado', type: 'sum' },
            { columnName: 'transferido', type: 'sum' },
        ]);
        setRows(rowsTurma);
        setLoadingTurma(false);
    }

    async function ShowAlunos() {   
        setLoadingAluno(true);
        setTypeData('Aluno');
        setRows([]);
        setTableColumnExtensions([
            { columnName: 'nome', width: 180, align: 'left', wordWrapEnabled: true },
            { columnName: 'cnh', width: 150, align: 'right' },
            { columnName: 'nascimento', width: 130, align: 'center' },
            { columnName: 'celular', width: 130, align: 'left' },
            { columnName: 'sexo', width: 80, align: 'center' },
            { columnName: 'turma', width: 100, align: 'center' },
            { columnName: 'data', width: 100, align: 'center' },
            { columnName: 'estado', width: 130, align: 'center' },
        ]);
        setColumns([
            { name: 'nome', title: 'Nome' },
            { name: 'cnh', title: 'CNH' },
            { name: 'nascimento', title: 'Nascimento' },
            { name: 'celular', title: 'Celular' },
            { name: 'sexo', title: 'Sexo' },
            { name: 'turma', title: 'Turma' },
            { name: 'data', title: 'Data' },
            { name: 'estado', title: 'Estado' },
        ]);
        setColumnOrder(['nome', 'cnh', 'nascimento', 'celular', 'sexo', 'turma', 'data', 'estado']);
        setRows(rowsAluno);
        setLoadingAluno(false);
    }

    return (
        <>
            <div className="container">
                <img src={logo} style={{ 'cursor': 'pointer' }} alt="Pilotando para Vida" className="logo" onClick={() =>
                    handleLogout()} />
                <div className="content">
                    <div style={{ 'display': 'flex', 'flexDirection': 'row' }}>
                        <button style={{ 'margin': '5px' }} onClick={ShowTurmas}>
                            {loadingTurma && <CircularProgress disableShrink size="20px" style={{ color: "#FFF" }} />}
                            {!loadingTurma && "Turma"}
                        </button>
                        <button style={{ 'margin': '5px' }} onClick={ShowAlunos}>
                            {loadingAluno && <CircularProgress disableShrink size="20px" style={{ color: "#FFF" }} />}
                            {!loadingAluno && "Aluno"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="data" id="data">
                <center><h1>{typeData}</h1></center>
                <p />
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
                            title="Total"
                        />

                        <IntegratedSorting />
                        <IntegratedPaging />
                        <IntegratedSummary />

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