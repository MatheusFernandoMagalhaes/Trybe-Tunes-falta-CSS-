import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = ({
    addSongIsLoading: false,
    isChecked: false,
  })

  componentDidMount() {
    this.getSongsFromLocalStorage();
  }

  getSongsFromLocalStorage = async () => {
    const getSongs = await getFavoriteSongs();
    const { music } = this.props;
    const boolean = getSongs.some(({ trackId }) => trackId === music.trackId);
    this.setState({ isChecked: boolean });
  }

  addSongToFavoriteSongs = async ({ target: { checked, name } }) => {
    const { music } = this.props;
    this.setState({
      addSongIsLoading: true,
      [name]: checked,
    });
    await addSong(music);
    this.setState({
      addSongIsLoading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { addSongIsLoading, isChecked } = this.state;
    return (
      <div>
        { addSongIsLoading && <Loading /> }
        <div>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
          </audio>
          <label
            htmlFor={ trackId }
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="isChecked"
              id={ trackId }
              onClick={ this.addSongToFavoriteSongs }
              checked={ isChecked }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  music: PropTypes.objectOf(PropTypes.object).isRequired,
};
