import React from 'react';
import DataOnGrid from './DataOnGrid'
import api from '../services/api';
import ReactDOM from 'react-dom';
import { BallBeat } from 'react-pure-loaders';

function ShowAlunos() {
    ReactDOM.render(
        <div className="fetching">
            <BallBeat
                color={'#F58D50'}
                loading={true}
            />
        </div>         
    , document.getElementById('data'));

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
                { columnName: 'nascimento', width: '60px' },
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
export default ShowAlunos;