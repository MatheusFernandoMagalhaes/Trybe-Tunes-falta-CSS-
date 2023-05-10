import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import Logo from '../imgs/LOGO_POSITIVA.png';
import { createUser } from '../services/userAPI';
import '../style/Login.css';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      disabled: true,
      isLoading: false,
      logged: false,
    };
  }

  userProfile = async () => {
    const { userName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: userName });
    this.setState({
      isLoading: false,
      logged: true,
    });
  }

  onInputChange = ({ target: { value } }) => {
    const minOfCharacters = 3;
    if (value.length >= minOfCharacters) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
    this.setState({
      userName: value });
  }

  render() {
    const { userName, disabled, isLoading, logged } = this.state;
    return (
      <div data-testid="page-login" id="login-content">
        { isLoading ? <Loading /> : (
          <div id="image-input-login">
            <img src={ Logo } alt="Logo Trybe Tunes" />
            <form id="form-content">
              <input
                name={ userName }
                data-testid="login-name-input"
                type="text"
                id="input-login"
                placeholder="Digite seu nome de usuário"
                onChange={ this.onInputChange }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ disabled }
                onClick={ this.userProfile }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        { logged && <Redirect to="/search" /> }
      </div>
    );
  }
}
