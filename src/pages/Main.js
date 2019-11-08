import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import './Main.css'
import ShowTurmas from './ShowTurmas'
import ShowAlunos from './ShowAlunos'
import DataGridTeste from './DataGridTeste'

/// https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/
/// https://devexpress.github.io/devextreme-reactive/react/grid/

// css: https://material-ui.com/pt/components/grid/

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

    return (
        <>
            <div className="container">
                <img src={logo} style={{ 'cursor': 'pointer' }} alt="Pilotando para Vida" className="logo" onClick={() =>
                    handleLogout()} />
                <div className="content">
                    <div style={{ 'display': 'flex', 'flexDirection': 'row' }}>
                        <button style={{ 'margin': '5px' }} onClick={ShowTurmas}>
                            Turma
                        </button>
                        <button style={{ 'margin': '5px' }} onClick={ShowAlunos}>
                            Aluno
                        </button>
                        <button onClick={DataGridTeste}>
                            Teste
                        </button>
                    </div>
                </div>
            </div>
            <div className="data" id="data">
            </div>
        </>
    );
}