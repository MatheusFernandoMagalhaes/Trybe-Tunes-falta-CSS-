import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
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
      <div data-testid="page-album" className="musics-content">
        <Header />
        { isLoading ? <Loading /> : (
          <>
            <div>
              <p data-testid="artist-name">{resultsApi[0].artistName}</p>
              <img
                src={ resultsApi[0].artworkUrl100 }
                alt={ resultsApi[0].collectionCensoredName }
              />
              <p data-testid="album-name">
                {resultsApi[0].collectionName}
              </p>
            </div>
            <div>
              {resultsApi.map((music, index) => (
                index !== 0 && (
                  <MusicCard
                    key={ music.trackId }
                    music={ music }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                  />
                )
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};
