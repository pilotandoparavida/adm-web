import React from 'react';
import DataOnGrid from './DataOnGrid'
import api from '../services/api';
import ReactDOM from 'react-dom';
import { BallBeat } from 'react-pure-loaders';

function ShowTurmas() {

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

    api.get('/turma')
        .then((response) => {
            const columns = [
                { name: 'data', title: 'Data' },
                { name: 'descricao', title: 'Descrição' },
                { name: 'vagas', title: 'Vagas' },
                { name: 'totalinscritos', title: 'Inscritos' },
            ];
            const tableColumnExtensions = [
                { columnName: 'data', width: '10px' },
                { columnName: 'descricao', width: 'auto' },
                { columnName: 'vagas', width: '10px' },
                { columnName: 'totalinscritos', width: '10px' },
            ];
            const rows = [];
            const turmaS = response.data.dados;
            for (let i = 0; i < turmaS.length; ++i) {
                rows.push({
                    data: convertDate(turmaS[i].data),
                    descricao: turmaS[i].descricao,
                    vagas: turmaS[i].vagas,
                    totalinscritos: turmaS[i].totalinscritos,
                });
            }

            ReactDOM.render(
                <DataOnGrid
                    title='Turma'
                    rows={rows}
                    columns={columns}
                    tableColumnExtensions={tableColumnExtensions}
                />            
            , document.getElementById('data'));
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        });
    return (<></>);
}

export default ShowTurmas;