import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    description: '',
    image: '',
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
      image: user.image,
    });
  }

  render() {
    const { isLoading, name, email, description, image } = this.state;
    const info = (
      <>
        <p>Profile</p>
        <img data-testid="profile-image" src={ image } alt={ image } />
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
        <Link to="/profile/edit">
          {' '}
          <button type="button">Editar perfil</button>
        </Link>

      </>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : info}
      </div>
    );
  }
}
