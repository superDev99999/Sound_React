const API_HOSTNAME = '//api.soundcloud.com';
const CLIENT_ID = 'f4323c6f7c0cd73d2d786a2b1cdae80c';

const constructUrl = url => `${API_HOSTNAME}${url}${url.indexOf('?') === -1 ? '?' : '&'}client_id=${CLIENT_ID}`;

export const SONG_URL = constructUrl('/tracks/:id');
export const SONG_COMMENTS_URL = constructUrl('/tracks/:id/comments');
export const SONGS_URL = constructUrl('/tracks?linked_partitioning=1&limit=50&offset=0');
export const USER_FOLLOWINGS_URL = constructUrl('/users/:id/followings');
export const USER_PROFILES_URL = constructUrl('/users/:id/web-profiles');
export const USER_URL = constructUrl('/users/:id');
export const USER_SONGS_URL = constructUrl('/users/:id/tracks');
