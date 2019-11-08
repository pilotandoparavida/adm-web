import api from '../services/api';

async function ListAluno() {
    const rows = []
    try {
        const response = await api.get('/aluno');
        const alunoS = response.data.dados;
        for (let i = 0; i < alunoS.length; ++i) {
            rows.push({
                id: alunoS[i]._id,
                nome: alunoS[i].nome,
                cnh: alunoS[i].cnh + '/' + alunoS[i].ufcnh,
                celular: alunoS[i].celular,
                sexo: alunoS[i].sexo,
                nascimento: alunoS[i].nascimento,
                // email: alunoS[i].email,
                // cpf: alunoS[i].cpf,
                // rg: alunoS[i].rg,
            });
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.msg);
        }
    }
    return rows;
}

export default ListAluno;