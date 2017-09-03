import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from '../components/Link';
import SongHeartCount from '../components/SongHeartCount';
import Waveform from '../components/Waveform';

import { SONG_PATH, USER_PATH } from '../constants/RouterConstants';
import { IMAGE_SIZES } from '../constants/SongConstants';

import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer';

import { addCommas } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  authed: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

class SongListItem extends Component {
  renderTogglePlayButton() {
    const { isActive, playSong } = this.props;
    return <TogglePlayButtonContainer isActive={isActive} playSong={playSong} />;
  }

  render() {
    const { authed, dispatch, isActive, player, playSong, song, user } = this.props;
    const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);

    return (
      <div className={`song-list-item ${(isActive ? ' active' : '')}`}>
        <div
          className="song-list-item__image"
          onClick={playSong}
          style={{ backgroundImage: `url(${image})` }}
        >
          {this.renderTogglePlayButton()}
        </div>
        <div className="song-list-item__info__wrap">
          <div className="song-list-item__info">
            <Link
              className="song-list-item-title"
              dispatch={dispatch}
              keys={{ id: String(song.id) }}
              path={SONG_PATH}
              route={{ path: ['songs', song.id] }}
            >
              {song.title}
            </Link>
            <div className="song-list-item-info-extra">
              <div className="song-list-item__user">
                <div
                  className="song-list-item-user-image"
                  style={{ backgroundImage: `url(${getImageUrl(user.avatar_url)})` }}
                />
                <Link
                  className="song-list-item-username"
                  dispatch={dispatch}
                  key={{ id: String(song.user_id) }}
                  path={USER_PATH}
                >
                  {user.username}
                </Link>
              </div>
              <div className="song-list-item-stats">
                <SongHeartCount
                  authed={authed}
                  count={song.favoritings_count}
                  dispatch={dispatch}
                  songId={song.id}
                />
                <div className="song-list-item-stat">
                  <i className="icon ion-play" />
                  <span>{addCommas(song.playback_count)}</span>
                </div>
                <div className="song-list-item-stat">
                  <i className="icon ion-chatbubble" />
                  <span>{addCommas(song.comment_count)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="song-list-item-waveform">
          <Waveform
            currentTime={player.currentTime}
            dispatch={dispatch}
            duration={song.duration}
            isActive={isActive}
            playSong={playSong}
            waveformUrl={song.waveform_url.replace('https', 'http')}
          />
        </div>
      </div>
    );
  }
}

SongListItem.propTypes = propTypes;

export default SongListItem;
