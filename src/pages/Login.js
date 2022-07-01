import React from 'react';
import Logo from '../imgs/LOGO_POSITIVA.png';
import '../style/Login.css';

export default class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login" id="login-content">
        <img src={ Logo } alt="Logo Trybe Tunes" />
        <form id="form-content">
          <input
            data-testid="login-name-input"
            type="text"
            id="input-login"
          />
          <button
            data-testid="login-submit-button"
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
