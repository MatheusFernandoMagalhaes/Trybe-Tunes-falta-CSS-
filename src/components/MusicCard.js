import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = ({
    addSongIsLoading: false,
    isChecked: false,
  })

  // addSongToFavoriteSongs = ({ target: { checked } }) => {
  //   this.setState({
  //     isChecked: checked,
  //   });
  // }

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

  // checked = ({ target }) => {
  //   const { checked } = this.state;
  //   console.log(checked);
  //   return true;
  // const { name } = target;
  // const value = target.type === 'checkbox' ? target.checked : target.value;
  // this.setState({
  //   [name]: value,
  // });
  // }

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
            htmlFor="favorite"
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              htmlFor="favorite"
              name="isChecked"
              id="favorite"
              onChange={ this.addSongToFavoriteSongs }
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

//   <div>
//   <p>{ trackName }</p>
//   <audio data-testid="audio-component" src={ previewUrl } controls>
//       <track kind="captions" />
//       O seu navegador não suporta o elemento
//     {' '}
//       {' '}
//       <code>audio</code>
//     </audio>
//   <label
//       data-testid={ `checkbox-music-${trackId}` }
//       htmlFor="favorite"
//     >
//     Favorita
//       <input
//       type="checkbox"
//       htmlFor="favorite"
//       onClick={ this.addSongToFavoriteSongs }
//     />
//     </label>
// </div>;
