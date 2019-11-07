import React from 'react';
import DataOnGrid from './DataOnGrid'
import api from '../services/api';
import ReactDOM from 'react-dom';
import { BallBeat } from 'react-pure-loaders';

async function ShowTurmas() {

    ReactDOM.render(
        <div className="fetching">
            <BallBeat
                color={'#F58D50'}
                loading={true}
            />
        </div>
        , document.getElementById('data'));

    function convertDate(data) {
        const date = new Date(data);
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }

    try {
        const response = await api.get('/turma');
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
            { columnName: 'data', width: '10px' },
            { columnName: 'descricao', width: 'auto' },
            { columnName: 'vagas', width: '5px' },
            { columnName: 'totalinscritos', width: '10px' },
            { columnName: 'confirmado', width: '25px' },
            { columnName: 'transferido', width: '25px' },
            { columnName: 'concluido', width: '15px' },
            { columnName: 'faltoso', width: '15px' },
        ];
        const rows = [];
        const turmaS = response.data.dados;
        for (let i = 0; i < turmaS.length; ++i) {
            try {
                const rTurma = await api.get('/aluno/turma', { headers: { 'turma_id': turmaS[i]._id } });
                let conf = 0;
                let transf = 0;
                let conc = 0;
                let falt = 0;
                const AlunoTurma = rTurma.data.dados;
                for (let j = 0; j < AlunoTurma.length; ++j) {
                    if (AlunoTurma[j].estado === "CONCLUIDO") conf++;
                    else if (AlunoTurma[j].estado === "TRANSFERIDO") transf++;
                    else if (AlunoTurma[j].estado === "CONFIRMADO") conf++;
                    else if (AlunoTurma[j].estado === "FALTOSO") falt++;
                }
                rows.push({
                    data: convertDate(turmaS[i].data),
                    descricao: turmaS[i].descricao,
                    vagas: turmaS[i].vagas,
                    totalinscritos: turmaS[i].totalinscritos,
                    confirmado: conf,
                    concluido: conc,
                    transferido: transf,
                    faltoso: falt,
                });
            } catch (e) {
                if (e.response) {
                    console.log(e.response.data.msg);
                }
                alert("Error!");
            }
        }

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