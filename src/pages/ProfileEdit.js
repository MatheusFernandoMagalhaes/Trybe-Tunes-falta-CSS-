import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../style/ProfileEdit.css';

export default class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    description: '',
    validateButton: true,
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      isLoading: false,
      name: user.name,
      email: user.email,
      image: localStorage.getItem('image'),
      description: user.description,
    });
  }

  setImage = async ({ target: { files } }) => {
    const base64 = await this.toBase64(files[0]);
    this.setState({ image: base64 });
    localStorage.setItem('image', base64);
  }

  toBase64 = (data) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (data) {
      reader.readAsDataURL(data);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    }
  })

  updateUser = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { name, email, description, image } = this.state;
    const editedUser = {
      name, email, image, description,
    };
    await updateUser(editedUser);
    history.push('/profile');
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
    const { name, email, description, image } = this.state;
    if (name.length > 0
      && email.length > 0
      && image.length > 0
      && description.length > 0) {
      this.setState({ validateButton: false });
    } else {
      this.setState({ validateButton: true });
    }
  }

  render() {
    const { isLoading, name, email, description, image, validateButton } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading /> : null}
        <h1>ProfileEdit</h1>
        <section>
          <form>
            <label htmlFor="image">
              <p>Imagem</p>
              <br />
              {image ? <img
                id="user-image"
                src={ image }
                alt={ image }
              />
                : <img src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png" alt="Imagem de usuário" />}
              <br />
              <br />
              <input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                data-testid="edit-input-image"
                onChange={ this.setImage }
              />
            </label>
            <label htmlFor="email">
              <p>Email:</p>
              <input
                type="text"
                name="email"
                id="email"
                data-testid="edit-input-email"
                required
                value={ email }
                placeholder="Digite seu email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="name">
              <p>Nome:</p>
              <input
                type="text"
                name="name"
                id="name"
                data-testid="edit-input-name"
                required
                value={ name }
                placeholder="Digite seu nome"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              <p>Descrição:</p>
              <input
                type="text"
                name="description"
                id="description"
                data-testid="edit-input-description"
                required
                value={ description }
                placeholder="Digite sua descrição"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              id="submit-button"
              data-testid="edit-button-save"
              disabled={ validateButton }
              onClick={ this.updateUser }
            >
              Editar perfil

            </button>
          </form>
        </section>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.string,
}.isRequired;
