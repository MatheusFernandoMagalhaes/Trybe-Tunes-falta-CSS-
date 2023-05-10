import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../style/Header.css';
import Loading from './Loading';

export default class Header extends React.Component {
  state = {
    userName: '',
    isLoading: false,
  }

  componentDidMount() {
    this.recoverUser();
  }

  recoverUser = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      userName: user.name,
      isLoading: false,
    });
  };

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading && <Loading /> }
        <div id="header-container">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <span data-testid="header-user-name">{ userName }</span>
        </div>
      </header>
    );
  }
}
