import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../style/Album.css';

export default class Album extends React.Component {
  state = ({
    resultsApi: [],
    isLoading: true,
  })

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      resultsApi: musics,
      isLoading: false,
    });
  };

  render() {
    const { resultsApi, isLoading } = this.state;
    return (
      <div data-testid="page-album" id="musics-container">
        <Header />
        { isLoading ? <Loading /> : (
          <div id="musics-content">
            <div>
              <h1 data-testid="artist-name">{resultsApi[0].artistName}</h1>
              <img
                src={ resultsApi[0].artworkUrl100 }
                alt={ resultsApi[0].collectionCensoredName }
              />
              <h2 data-testid="album-name">
                {resultsApi[0].collectionName}
              </h2>
            </div>
            <div id="audios-container">
              {resultsApi.map((music, index) => (
                index !== 0 && (
                  <MusicCard
                    key={ music.trackId }
                    music={ music }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    getFavoriteSongsList={ this.getFavoriteSongs }
                  />
                )
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};
