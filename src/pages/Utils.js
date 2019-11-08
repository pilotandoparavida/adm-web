import api from '../services/api';

function convertDate(data) {
    const date = new Date(data);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
}

async function ListTurma() {
    const rows = []
    const response = await api.get('/turma');
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
                id: turmaS[i]._id,
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
    return rows;
}

export default ListTurma;