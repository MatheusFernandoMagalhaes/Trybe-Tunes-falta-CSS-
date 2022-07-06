import React from 'react';
import Header from '../components/Header';

export default class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Profile</p>
      </div>
    );
  }
}
