import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { music } = this.props;
    return (
      <div>
        <p>{ music.trackName }</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf.isRequired,
};
