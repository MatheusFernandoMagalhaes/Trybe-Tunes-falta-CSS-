import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = ({
    isLoading: false,
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

  handleChange = async () => {
    const { isChecked } = this.state;
    if (isChecked === true) {
      this.setState({ isChecked: false });
      this.removeSong();
    } else {
      this.setState({ isChecked: true });
      this.addSong();
    }
  }

  addSong = async () => {
    const { music } = this.props;
    this.setState({ isLoading: true });
    await addSong(music);
    this.setState({ isLoading: false });
  }

  removeSong = async () => {
    const { music } = this.props;
    this.setState({ isLoading: true });
    await removeSong(music);
    this.setState({ isLoading: false });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <div>
        { isLoading && <Loading /> }
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
              onChange={ this.handleChange }
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
