import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  state = {
    disabled: true,
    musicOrArtist: '',
    isLoading: false,
    showResults: null,
    resultsApi: [],
  }

  onInputChange = ({ target: { value, name } }) => {
    const minOfCharacters = 2;
    if (value.length >= minOfCharacters) {
      this.setState({
        disabled: false,
        [name]: value,
      });
    } else {
      this.setState({
        disabled: true,
        [name]: value,
      });
    }
  }

  searchMusicOrArtist = async () => {
    const { musicOrArtist } = this.state;
    this.setState({
      isLoading: true,
    });
    const data = await searchAlbumsAPI(musicOrArtist);
    this.setState({
      musicOrArtist: '',
      isLoading: false,
      resultsApi: data,
      showResults: musicOrArtist,
      disabled: true,
    });
  };

  render() {
    const { disabled, musicOrArtist, isLoading, resultsApi, showResults } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        { isLoading ? <Loading /> : (
          <>
            <input
              type="text"
              data-testid="search-artist-input"
              name="musicOrArtist"
              value={ musicOrArtist }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disabled }
              onClick={ this.searchMusicOrArtist }
            >
              Pesquisar
            </button>
          </>
        )}
        { showResults && resultsApi.length !== 0 && (
          <div>
            <p>
              Resultado de álbuns de:
              {' '}
              { showResults }
            </p>
            { resultsApi.map((artist) => (
              <Link
                to={ `/album/${artist.collectionId}` }
                key={ artist.collectionId }
                data-testid={ `link-to-album-${artist.collectionId}` }
              >
                <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
                <p>
                  { artist.artistName }
                </p>
                <p>
                  { artist.collectionName }
                </p>
              </Link>))}
          </div>
        )}
        { showResults && resultsApi.length === 0 && (
          <p>Nenhum álbum foi encontrado</p>
        )}
      </div>
    );
  }
}
