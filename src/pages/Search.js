import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
      </div>
    );
  }
}
