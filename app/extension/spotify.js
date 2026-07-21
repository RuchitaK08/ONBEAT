import { hasValidSpotifyAuth, saveSpotifyAuth } from './storage.js';
import { SPOTIFY_CLIENT_ID } from './config.js';

// Base Spotify API endpoints used by the extension.
const API_BASE = 'https://api.spotify.com/v1';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Send a request to the Spotify API using the stored access token.
// If the token has expired (401), attempt a refresh using the refresh token.
async function spotifyRequest(path, authState, options = {}) {
  if (!hasValidSpotifyAuth(authState) && !authState?.refreshToken) {
    throw new Error('Your Spotify session has expired. Please reconnect.');
  }

  const doRequest = async (token) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: options.method || 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = payload.error?.message || payload.error || 'Spotify request failed.';
      const status = response.status;
      const error = new Error(message);
      error.status = status;
      error.payload = payload;
      throw error;
    }

    return payload;
  };

  try {
    return await doRequest(authState.accessToken);
  } catch (err) {
    // If token expired or unauthorized, try to refresh (if refresh token available)
    if ((err.status === 401 || err.status === 400) && authState?.refreshToken) {
      try {
        const refreshed = await refreshAccessToken(authState);
        // persist refreshed tokens
        await saveSpotifyAuth(refreshed);
        return await doRequest(refreshed.accessToken);
      } catch (refreshErr) {
        // surface refresh errors
        const message = refreshErr?.message || 'Token refresh failed.';
        throw new Error(message);
      }
    }

    throw err;
  }
}

// Exchange a refresh token for a new access token.
// PKCE clients do not use client secret here; only client_id and refresh_token.
async function refreshAccessToken(authState) {
  if (!authState?.refreshToken) {
    throw new Error('No refresh token available. Please reconnect to Spotify.');
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: authState.refreshToken,
    client_id: SPOTIFY_CLIENT_ID
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload.error_description || payload.error || 'Failed to refresh Spotify token.';
    throw new Error(message);
  }

  // Merge refreshed token data into a new auth state
  const newAuth = {
    ...authState,
    accessToken: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in || 3600) * 1000
  };

  // Spotify may or may not return a new refresh token
  if (payload.refresh_token) newAuth.refreshToken = payload.refresh_token;

  return newAuth;
}

// Read the current user's Spotify profile.
async function getSpotifyProfile(authState) {
  return spotifyRequest('/me', authState);
}

// Read the user's top tracks and artists.
async function getSpotifyTopTracks(authState, limit = 10) {
  return spotifyRequest(`/me/top/tracks?limit=${limit}`, authState);
}

async function getSpotifyTopArtists(authState, limit = 5) {
  return spotifyRequest(`/me/top/artists?limit=${limit}`, authState);
}

// Get track recommendations from Spotify using seed artists/tracks and target tempo/energy.
async function getRecommendations(authState, { seed_artists = [], seed_tracks = [], target_tempo, target_energy, limit = 20 }) {
  const params = new URLSearchParams();
  if (seed_artists.length) params.set('seed_artists', seed_artists.slice(0,5).join(','));
  if (seed_tracks.length) params.set('seed_tracks', seed_tracks.slice(0,5).join(','));
  params.set('limit', String(limit));
  if (typeof target_tempo === 'number') params.set('target_tempo', String(Math.round(target_tempo)));
  if (typeof target_energy === 'number') params.set('target_energy', String(target_energy));

  return spotifyRequest(`/recommendations?${params.toString()}`, authState);
}

// Create a playlist for a user.
async function createPlaylist(authState, userId, playlistData) {
  return spotifyRequest(`/users/${userId}/playlists`, authState, {
    method: 'POST',
    body: playlistData
  });
}

// Add tracks (URIs) to a playlist.
async function addTracksToPlaylist(authState, playlistId, uris = []) {
  return spotifyRequest(`/playlists/${playlistId}/tracks`, authState, {
    method: 'POST',
    body: { uris }
  });
}

// Map workout to BPM and an energy value between 0-1 used by Spotify recommendations.
function mapWorkoutToTarget(workout) {
  const map = {
    Yoga: { bpm: 90, energy: 0.25 },
    Walking: { bpm: 100, energy: 0.3 },
    Strength: { bpm: 120, energy: 0.55 },
    Cycling: { bpm: 145, energy: 0.75 },
    Running: { bpm: 160, energy: 0.9 },
    HIIT: { bpm: 170, energy: 0.98 }
  };

  return map[workout] || { bpm: 160, energy: 0.8 };
}

// Build a workout playlist using recommendations seeded by the user's preferences.
// Returns an object with { playlist, trackCount }
async function generateWorkoutPlaylist(authState, workout) {
  if (!authState) throw new Error('No Spotify auth provided.');

  const { bpm, energy } = mapWorkoutToTarget(workout);

  // Get user profile and their top artists/tracks to seed recommendations.
  const [profile, topTracksResp, topArtistsResp] = await Promise.all([
    getSpotifyProfile(authState).catch(() => null),
    getSpotifyTopTracks(authState, 5).catch(() => ({ items: [] })),
    getSpotifyTopArtists(authState, 5).catch(() => ({ items: [] }))
  ]);

  const userId = profile?.id;
  const seed_tracks = (topTracksResp?.items || []).slice(0,5).map(t => t.id);
  const seed_artists = (topArtistsResp?.items || []).slice(0,5).map(a => a.id);

  // Fetch recommendations
  const recs = await getRecommendations(authState, {
    seed_artists,
    seed_tracks,
    target_tempo: bpm,
    target_energy: energy,
    limit: 20
  });

  const trackUris = (recs?.tracks || []).map(t => t.uri).slice(0,50);

  if (!userId) {
    throw new Error('Unable to read Spotify user profile.');
  }

  if (!trackUris.length) {
    throw new Error('Could not find any suitable tracks for this workout.');
  }

  // Create playlist and add tracks
  const playlistName = `${workout} • ${bpm} BPM`;
  const playlist = await createPlaylist(authState, userId, {
    name: playlistName,
    public: false,
    description: `Generated by ONBEAT for ${workout} at ${bpm} BPM`
  });

  await addTracksToPlaylist(authState, playlist.id, trackUris);

  return { playlist, trackCount: trackUris.length };
}

export {
  getSpotifyProfile,
  getSpotifyTopTracks,
  getSpotifyTopArtists,
  getRecommendations,
  createPlaylist,
  addTracksToPlaylist,
  generateWorkoutPlaylist
};
