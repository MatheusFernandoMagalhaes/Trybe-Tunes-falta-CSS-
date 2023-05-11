import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../style/Search.css';

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
      <div data-testid="page-search" id="search-container">
        <Header />
        { isLoading ? <Loading /> : (
          <>
            <input
              type="text"
              data-testid="search-artist-input"
              name="musicOrArtist"
              value={ musicOrArtist }
              placeholder="Digite o nome da música ou artista"
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
          <>
            <h1>
              Resultado de álbuns de:
              {' '}
              { showResults }
            </h1>
            <div id="music-card-container">
              { resultsApi.map((artist) => (
                <div
                  id="music-card-div"
                  key={ artist.collectionId }
                >
                  <Link
                    to={ `/album/${artist.collectionId}` }
                    data-testid={ `link-to-album-${artist.collectionId}` }
                  >
                    <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
                    <p>
                      { artist.artistName }
                    </p>
                    <p>
                      { artist.collectionName }
                    </p>
                  </Link>

                </div>))}
            </div>
          </>
        )}
        { showResults && resultsApi.length === 0 && (
          <p>Nenhum álbum foi encontrado</p>
        )}
      </div>
    );
  }
}
