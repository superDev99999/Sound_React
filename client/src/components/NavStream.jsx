import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from '../components/Link';
import { SONGS_PATH } from '../constants/RouterConstants';

const propTypes = {
  fetchNewStreamSongs: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  showStream: PropTypes.bool.isRequired,
  streamFutureUrl: PropTypes.string.isRequired,
};

class NavStream extends Component {
  constructor() {
    super();
    this.interval = null;
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      const { fetchNewStreamSongs, streamFutureUrl } = this.props;
      if (streamFutureUrl) {
        fetchNewStreamSongs(streamFutureUrl);
      }
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const { navigateTo, showStream } = this.props;

    return (
      <Link
        className={`nav-session__item ${showStream ? 'nav-session__item--active' : ''}`}
        navigateTo={navigateTo}
        path={SONGS_PATH}
        options={{ s: 'stream' }}
      >
        Stream
      </Link>
    );
  }
}

NavStream.propTypes = propTypes;

export default NavStream;
