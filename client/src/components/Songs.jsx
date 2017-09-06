import PropTypes from 'prop-types';
import React, { Component } from 'react';

import InfiniteScroll from '../components/InfiniteScroll';
import SongsBody from '../components/SongsBody';
import SongsHeader from '../components/SongsHeader';
import stickify from '../components/Stickify';

const defaultProps = {
  playingSongId: null,
  time: null,
};

const propTypes = {
  authed: PropTypes.shape({}).isRequired,
  fetchSongsIfNeeded: PropTypes.func.isRequired,
  fetchSongsNext: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  height: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  likes: PropTypes.shape({}).isRequired,
  navigateTo: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  showLikes: PropTypes.bool.isRequired,
  showStream: PropTypes.bool.isRequired,
  sticky: PropTypes.bool.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  time: PropTypes.string.isRequired,
  times: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

class Songs extends Component {
  componentWillMount() {
    const { fetchSongsIfNeeded, playlist } = this.props;
    fetchSongsIfNeeded(playlist);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchSongsIfNeeded, playlist } = this.props;
    if (playlist !== nextProps.playlist) {
      fetchSongsIfNeeded(nextProps.playlist);
    }
  }

  render() {
    const {
      authed,
      fetchSongsNext,
      genre,
      genres,
      height,
      isFetching,
      isPlaying,
      navigateTo,
      likes,
      playingSongId,
      playlist,
      playSong,
      search,
      showLikes,
      showStream,
      sticky,
      songs,
      time,
      times,
    } = this.props;

    return (
      <InfiniteScroll args={[playlist]} onScroll={fetchSongsNext}>
        <SongsHeader
          genre={genre}
          genres={genres}
          navigateTo={navigateTo}
          search={search}
          showLikes={showLikes}
          showStream={showStream}
          sticky={sticky}
          time={time}
          times={times}
        />
        <div className="container">
          <SongsBody
            authed={authed}
            height={height}
            isFetching={isFetching}
            isPlaying={isPlaying}
            likes={likes}
            navigateTo={navigateTo}
            playingSongId={playingSongId}
            playlist={playlist}
            playSong={playSong}
            songs={songs}
          />
        </div>
      </InfiniteScroll>
    );
  }
}

Songs.defaultProps = defaultProps;
Songs.propTypes = propTypes;

export default stickify(Songs, 50);
