import React from 'react';
import DataOnGrid from './DataOnGrid'
import ReactDOM from 'react-dom';
import { BallBeat } from 'react-pure-loaders';
import ListTurma from './Utils'

async function ShowTurmas() {

    ReactDOM.render(
        <div className="fetching">
            <BallBeat
                color={'#F58D50'}
                loading={true}
            />
        </div>
        , document.getElementById('data'));

    try {

        const columns = [
            { name: 'data', title: 'Data' },
            { name: 'descricao', title: 'Descrição' },
            { name: 'vagas', title: 'Vagas' },
            { name: 'totalinscritos', title: 'Inscritos' },
            { name: 'confirmado', title: 'Confirmados' },
            { name: 'transferido', title: 'Transferidos' },
            { name: 'concluido', title: 'Concluído' },
            { name: 'faltoso', title: 'Faltoso' },
        ];
        const tableColumnExtensions = [
            { columnName: 'data', width: 180, align: 'center' },
            { columnName: 'descricao', width: 250, align: 'right' },
            { columnName: 'vagas', width: 180, align: 'center' },
            { columnName: 'totalinscritos', width: 180, align: 'center' },
            { columnName: 'confirmado', width: 180, align: 'center' },
            { columnName: 'concluido', width: 180, align: 'center' },
            { columnName: 'faltoso', width: 180, align: 'center' },
            { columnName: 'transferido', width: 180, align: 'center' },
        ];
        const rows = await ListTurma();
        ReactDOM.render(
            <DataOnGrid
                title='Turma'
                rows={rows}
                columns={columns}
                tableColumnExtensions={tableColumnExtensions}
            />
            , document.getElementById('data'));

    } catch (error) {
        if (error.response) {
            console.log(error.response.data.msg);
        }
    }
    return (<></>);
}

export default ShowTurmas;