import { hasValidSpotifyAuth } from './storage.js';

// Send a request to the Spotify API using the stored access token.
async function spotifyRequest(path, authState, options = {}) {
  if (!hasValidSpotifyAuth(authState)) {
    throw new Error('Your Spotify session has expired. Please reconnect.');
  }

  const response = await fetch(`https://api.spotify.com/v1${path}`, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${authState.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload.error?.message || 'Spotify request failed.';
    throw new Error(message);
  }

  return payload;
}

// Read the current user's Spotify profile. This is a useful first extension point.
async function getSpotifyProfile(authState) {
  return spotifyRequest('/me', authState);
}

// Read the user's top tracks. Useful for creating workout-based playlists later.
async function getSpotifyTopTracks(authState, limit = 10) {
  return spotifyRequest(`/me/top/tracks?limit=${limit}`, authState);
}

// Create a playlist for a user. This is a simple foundation for future playlist generation.
async function createPlaylist(authState, userId, playlistData) {
  return spotifyRequest(`/users/${userId}/playlists`, authState, {
    method: 'POST',
    body: playlistData
  });
}

export {
  getSpotifyProfile,
  getSpotifyTopTracks,
  createPlaylist
};
