import React from 'react';
import PropTypes from 'prop-types';
// import Header from '../components/Header';
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
    console.log(musics);
    this.setState({
      resultsApi: musics,
      isLoading: false,
    });
  };

  render() {
    const { resultsApi, isLoading } = this.state;
    return (
      <div data-testid="page-album" className='musics-content'>
        { isLoading ? <Loading /> : (
          <>
            <div>
              <p data-testid="artist-name">{resultsApi[0].artistName}</p>
              <p data-testid="album-name">
                {resultsApi[0].collectionName}
              </p>
            </div>
            <div>
              {resultsApi.map((music, index) => (
                index !== 0 && (
                  <MusicCard key={ music.trackId } music={ music } />
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
