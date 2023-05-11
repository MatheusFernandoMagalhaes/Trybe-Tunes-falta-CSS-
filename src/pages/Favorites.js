import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  state = ({
    favoriteSongs: [],
    isLoading: false,
  })

  componentDidMount = () => {
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const musics = await getFavoriteSongs();
    this.setState({ isLoading: false, favoriteSongs: musics });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        { isLoading ? <Loading /> : (favoriteSongs.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            removeSong="removeSong"
            getFavoriteSongsList={ this.getFavoriteSongs }
          />
        )))}
      </div>
    );
  }
}
