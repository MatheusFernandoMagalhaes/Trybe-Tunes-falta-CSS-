import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  state = {
    disabled: true,
  }

  onInputChange = ({ target: { value } }) => {
    const minOfCharacters = 2;
    if (value.length >= minOfCharacters) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabled }
          // onClick={ }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
