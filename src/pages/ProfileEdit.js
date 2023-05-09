import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    description: '',
    image: '',
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
      description: user.description,
      image: user.image,
    });
  }

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
        <p>ProfileEdit</p>
        <section>
          <form>
            <label htmlFor="image">
              <p>Image</p>
              <input
                type="text"
                name="image"
                id="image"
                data-testid="edit-input-image"
                required
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              <p>email</p>
              <input
                type="text"
                name="email"
                id="email"
                data-testid="edit-input-email"
                required
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="name">
              <p>name</p>
              <input
                type="text"
                name="name"
                id="name"
                data-testid="edit-input-name"
                required
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              <p>description</p>
              <input
                type="text"
                name="description"
                id="description"
                data-testid="edit-input-description"
                required
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
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
