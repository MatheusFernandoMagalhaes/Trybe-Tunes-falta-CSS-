import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../style/Profile.css';

export default class Profile extends React.Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    image: localStorage.getItem('image'),
    description: '',
  }

  componentDidMount= () => {
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
    });
  }

  render() {
    const { isLoading, name, email, description, image } = this.state;
    const info = (
      <div>
        <h1>Profile</h1>
        <div id="profile-infos-content">
          <img
            id="profile-image"
            data-testid="profile-image"
            src={ image || 'https://www.gov.br/cdn/sso-status-bar/src/image/user.png' }
            alt={ image }
          />
          <p>
            Nome:
            {' '}
            <span>{name}</span>
          </p>
          <p>
            Email:
            {' '}
            <span>{email}</span>
          </p>
          <p>
            Descrição:
            {' '}
            <span>{description}</span>
          </p>
        </div>
        <Link to="/profile/edit">
          {' '}
          <button type="button">Editar perfil</button>
        </Link>

      </div>
    );
    return (
      <>
        <div>
          <Header />
        </div>
        <div data-testid="page-profile" id="page-content">
          {isLoading ? <Loading /> : info}
        </div>
      </>
    );
  }
}
