const STORAGE_KEY = 'onbeat.spotifyAuth';

// Save the Spotify auth state locally so the popup can restore the connection.
async function saveSpotifyAuth(authState) {
  const payload = {
    ...authState,
    savedAt: Date.now()
  };

  await chrome.storage.local.set({ [STORAGE_KEY]: payload });
  return payload;
}

// Load the stored auth state from extension storage.
async function getSpotifyAuth() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || null;
}

// Remove the stored auth state when the user disconnects or a token expires.
async function clearSpotifyAuth() {
  await chrome.storage.local.remove(STORAGE_KEY);
}

// Return true when the token exists and is still valid.
function hasValidSpotifyAuth(authState) {
  if (!authState?.accessToken || !authState?.expiresAt) {
    return false;
  }

  return authState.expiresAt > Date.now();
}

export {
  STORAGE_KEY,
  saveSpotifyAuth,
  getSpotifyAuth,
  clearSpotifyAuth,
  hasValidSpotifyAuth
};
