import api from '../services/api';

// function convertDate(data) {
//     const date = new Date(data);
//     return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
// }

async function ListAluno() {
    const rows = []
    try {
        const response = await api.get('/aluno');
        const alunoS = response.data.dados;
        for (let i = 0; i < alunoS.length; ++i) {

            try {
                // const rTurma = await api.get( `/turma/${alunoS[i].turma}`);
                // const rAlunoTurma = await api.get('/aluno/turma', { headers: {'aluno_id': alunoS[i]._id, 'turma_id': alunoS[i].turma}});

                rows.push({
                    id: alunoS[i]._id,
                    nome: alunoS[i].nome,
                    cnh: alunoS[i].cnh + '/' + alunoS[i].ufcnh,
                    celular: alunoS[i].celular,
                    sexo: alunoS[i].sexo,
                    nascimento: alunoS[i].nascimento,
                    turma: "", // rTurma.data.dados.descricao,
                    data: "", //convertDate(rTurma.data.dados.data),
                    estado: "CONFIRMADO", //rAlunoTurma.data.dados.estado,
                });
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.msg);
                }
            }            
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.msg);
        }
    }
    return rows;
}

export default ListAluno;