import React, { useState } from 'react';
import api from '../services/api';
import logo from '../assets/logo.png';

export default function Entrar({ history }) {
    const [geralError, setGeralError] = useState('');
    const [login, setLogin] = useState('');
    const [loginError, setLoginError] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [loading, setLoading] = useState(false);

    function validateForm() {
        let valid = true;
        if (!login) {
            setLoginError('Informe o login.');
            valid = false;
        } else {
            setLoginError('');
        }
        if (!senha) {
            setSenhaError('Informe a senha.');
            valid = false;
        } else {
            setSenhaError('');
        }
        return valid;
    }

    async function handleEntrar(event) {
        setGeralError('');
        event.preventDefault();
        if (validateForm()) {
            setLoading(true);
            api.get('/login', { headers: { login, senha } })
                .then((response) => {
                    setLoading(false);
                    const hash = response.data.dados;
                    localStorage.setItem('@admfrontendppv/hash', hash);
                    localStorage.setItem('@admfrontendppv/login', login);
                    if (history) history.push('/');
                })
                .catch((error) => {
                    setLoading(false);
                    if (error.response) {
                        setGeralError(error.response.data.msg);
                    }
                });
        }
    }

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
                    <form onSubmit={handleEntrar}>
                        <label htmlFor="login">Login*</label>
                        <div style={{ fontSize: 12, color: 'red' }}>{loginError}</div>
                        <input type="text" id="login" placeholder="Login" onChange={event => setLogin(event.target.value)} value={login} />

                        <label htmlFor="nascimento">Senha*</label>
                        <div style={{ fontSize: 12, color: 'red' }}>{senhaError}</div>
                        <input type="password" id="senha" placeholder="Senha" onChange={event => setSenha(event.target.value)} value={senha} />

                        <div style={{ fontSize: 12, color: 'red' }}>{geralError}</div>
                        <button type="submit" disabled={loading}>
                            {loading && <i className="fa fa-refresh fa-spin" />}
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}