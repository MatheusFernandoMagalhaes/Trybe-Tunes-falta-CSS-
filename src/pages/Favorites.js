import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  state = ({
    resultsApi: [],
    isLoading: false,
  })

  componentDidMount = () => {
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const musics = await getFavoriteSongs();
    this.setState({ isLoading: false, resultsApi: musics });
  }

  render() {
    const { isLoading, resultsApi } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites</p>
        { isLoading ? <Loading /> : (resultsApi.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            getFavoriteSongsResult={ this.getFavoriteSongs }
          />
        )))}
      </div>
    );
  }
}
