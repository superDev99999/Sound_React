import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SongCards from '../components/SongCards';
import stickify from '../components/Stickify';
import Toolbar from '../components/Toolbar';

const defaultProps = {
  playingSongId: null,
  time: null,
};

const propTypes = {
  authed: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchSongsIfNeeded: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  playSong: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  sticky: PropTypes.bool.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  time: PropTypes.number,
};

class Songs extends Component {
  componentWillMount() {
    const { fetchSongsIfNeeded, playlist } = this.props;
    fetchSongsIfNeeded(playlist);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchSongsIfNeeded, playlist } = this.props;
    if (playlist !== nextProps.playlist) {
      fetchSongsIfNeeded(playlist);
    }
  }

  render() {
    const {
      authed,
      dispatch,
      fetchSongsIfNeeded,
      height,
      isFetching,
      playingSongId,
      playlist,
      playSong,
      sticky,
      songs,
      time,
    } = this.props;

    return (
      <div className={`songs ${(sticky ? 'sticky' : '')}`}>
        <Toolbar dispatch={dispatch} playlist={playlist} sticky={sticky} time={time} />
        <div className="container">
          <SongCards
            authed={authed}
            dispatch={dispatch}
            isFetching={isFetching}
            height={height}
            playingSongId={playingSongId}
            playlist={playlist}
            playSong={playSong}
            onScroll={() => { fetchSongsIfNeeded(playlist); }}
            songs={songs}
          />
        </div>
      </div>
    );
  }
}

Songs.defaultProps = defaultProps;
Songs.propTypes = propTypes;

export default stickify(Songs, 50);