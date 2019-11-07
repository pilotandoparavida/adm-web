import React from 'react';
import DataOnGrid from './DataOnGrid'
import api from '../services/api';
import ReactDOM from 'react-dom';

function ShowTurmas() {

    function convertDate(data) {
        const date = new Date(data);
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }

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
    return (<></>);
}

export default ShowTurmas;