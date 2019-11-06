import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import api from '../services/api';
import './Main.css'
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import {
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';

import ReactDOM from 'react-dom';

/// https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/
/// https://devexpress.github.io/devextreme-reactive/react/grid/

export default function Main({ history }) {
    const [login] = useState(
        localStorage.getItem('@admfrontendppv/login') || ''
    );
    const [hash] = useState(
        localStorage.getItem('@admfrontendppv/hash') || ''
    );

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

    function DataOnGrid(props) {
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

    function convertDate(data) {
        const date = new Date(data);
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }

    function fetchTurma() {
        api.get('/turma')
            .then((response) => {
                const columns = [
                    { name: 'descricao', title: 'Descrição' },
                    { name: 'data', title: 'Data' },
                    { name: 'vagas', title: 'Vagas' },
                    { name: 'totalinscritos', title: 'Total Inscritos' },
                    { name: 'endereco', title: 'Endereço' }
                ];
                const tableColumnExtensions = [
                    { columnName: 'descricao', width: 'auto' },
                    { columnName: 'data', width: '10px' },
                    { columnName: 'vagas', width: '10px' },
                    { columnName: 'totalinscritos', width: '10px' },
                    { columnName: 'endereco', width: 'auto' },
                ];
                const rows = [];
                const turmaS = response.data.dados;
                for (let i = 0; i < turmaS.length; ++i) {
                    rows.push({
                        descricao: turmaS[i].descricao,
                        data: convertDate(turmaS[i].data),
                        vagas: turmaS[i].vagas,
                        totalinscritos: turmaS[i].totalinscritos,
                        endereco: turmaS[i].endereco
                    });
                }

                ReactDOM.render(<DataOnGrid 
                        title='Turma' 
                        rows={rows} 
                        columns={columns} 
                        tableColumnExtensions={tableColumnExtensions}
                     />, document.getElementById('data'));
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data.msg);
                }
            });
    }

    function fetchAluno() {
        api.get('/aluno')
            .then((response) => {
                const columns = [
                    { name: 'nome', title: 'Nome' },
                    { name: 'cnh', title: 'CNH' },
                    { name: 'ufcnh', title: 'UF CNH' },
                    { name: 'nascimento', title: 'Nascimento' },
                    { name: 'celular', title: 'Celular' },
                    { name: 'sexo', title: 'Sexo' },
                    // { name: 'email', title: 'E-mail' },
                    // { name: 'cpf', title: 'CPF' },
                    // { name: 'rg', title: 'RG'},
                ];
                const tableColumnExtensions = [
                    { columnName: 'nome', width: 'auto' },
                    { columnName: 'cnh', width: '50px' },
                    { columnName: 'ufcnh', width: '10px' },
                    { columnName: 'celular', width: '20px' },
                    { columnName: 'sexo', width: '10px' },
                    { columnName: 'nascimento', width: 'auto' },
                ];
                const rows = [];
                const alunoS = response.data.dados;
                for (let i = 0; i < alunoS.length; ++i) {
                    rows.push({
                        nome: alunoS[i].nome,
                        cnh: alunoS[i].cnh,
                        ufcnh: alunoS[i].ufcnh,
                        celular: alunoS[i].celular,
                        sexo: alunoS[i].sexo,
                        nascimento: alunoS[i].nascimento,
                        // email: alunoS[i].email,
                        // cpf: alunoS[i].cpf,
                        // rg: alunoS[i].rg,
                    });
                }

                ReactDOM.render(<DataOnGrid 
                    title='Aluno' 
                    rows={rows} 
                    columns={columns} 
                    tableColumnExtensions={tableColumnExtensions}
                 />, document.getElementById('data'));
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data.msg);
                }
            });
    }

    return (
        <>
            <div className="container">
                <img src={logo} style={{ 'cursor': 'pointer' }} alt="Pilotando para Vida" className="logo" onClick={() =>
                    handleLogout()} />
                <div className="content">
                    <div style={{ 'display': 'flex', 'flexDirection': 'row' }}>
                        <button style={{ 'margin': '5px' }} onClick={fetchTurma}>
                            Turma
                        </button>
                        <button style={{ 'margin': '5px' }} onClick={fetchAluno}>
                            Aluno
                        </button>
                    </div>
                </div>
            </div>
            <div className="data" id="data">
            </div>
        </>
    );
}