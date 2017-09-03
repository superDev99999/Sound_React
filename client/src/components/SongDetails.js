import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from '../components/Link';
import { formatSongTitle } from '../utils/FormatUtils';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  songId: PropTypes.number,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number,
  username: PropTypes.string.isRequired,
};

class SongDetails extends Component {
  render() {
    const { dispatch, songId, title, userId, username } = this.props;
    return (
      <div className="songs-body-card__details">
        <Link
          className="songs-body-card__title"
          dispatch={dispatch}
          route={{ path: ['songs', songId] }}
          title={title}
        >
          {formatSongTitle(title)}
        </Link>
        <Link
          className="songs-body-card__user-username"
          dispatch={dispatch}
          route={{ path: ['users', userId] }}
          title={username}
        >
          {username}
        </Link>
      </div>
    );
  }
}

SongDetails.propTypes = propTypes;

export default SongDetails;
