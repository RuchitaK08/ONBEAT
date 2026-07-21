const SPOTIFY_CLIENT_ID = 'fb59babdf2364cec8eefcbebc007190e';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_SCOPES = ['user-read-email', 'user-read-private'];

// Convert a byte array into a URL-safe base64 string for PKCE challenge generation.
function base64UrlEncode(value) {
  return btoa(String.fromCharCode(...new Uint8Array(value)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

// Create a PKCE verifier and challenge pair that Spotify requires for the auth code flow.
async function generatePkcePair() {
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const verifier = base64UrlEncode(randomValues);

  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const challenge = base64UrlEncode(digest);

  return { verifier, challenge };
}

// Build the Spotify authorization URL with the required PKCE parameters.
function buildAuthUrl(redirectUri, challenge, state) {
  const authUrl = new URL(SPOTIFY_AUTH_URL);

  authUrl.searchParams.set('client_id', SPOTIFY_CLIENT_ID);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', SPOTIFY_SCOPES.join(' '));
  authUrl.searchParams.set('code_challenge', challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  authUrl.searchParams.set('state', state);

  return authUrl.toString();
}

// Exchange the Spotify authorization code for an access token securely.
async function exchangeCodeForToken(code, redirectUri, verifier) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: SPOTIFY_CLIENT_ID,
    code_verifier: verifier
  });

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload.error_description || payload.error || 'Spotify token exchange failed.';
    throw new Error(message);
  }

  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token || null,
    tokenType: payload.token_type || 'Bearer',
    expiresAt: Date.now() + (payload.expires_in || 3600) * 1000,
    scope: payload.scope || SPOTIFY_SCOPES.join(' ')
  };
}

// Read the code and state values returned from Spotify after the redirect completes.
function parseAuthResponse(responseUrl) {
  const url = new URL(responseUrl);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    throw new Error('Spotify login was cancelled or denied.');
  }

  return { code, state };
}

// Start the full Spotify OAuth 2.0 Authorization Code + PKCE flow using Chrome identity.
export async function authenticateWithSpotify() {
  if (!chrome?.identity?.launchWebAuthFlow) {
    throw new Error('Chrome identity APIs are unavailable in this context.');
  }

  const redirectUri = chrome.identity.getRedirectURL('callback');
  const pkce = await generatePkcePair();
  const state = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  const authUrl = buildAuthUrl(redirectUri, pkce.challenge, state);

  let responseUrl;

  try {
    responseUrl = await chrome.identity.launchWebAuthFlow({
      url: authUrl,
      interactive: true
    });
  } catch (error) {
    const message = error?.message || '';

    if (message.includes('redirect_uri') || message.includes('redirect')) {
      throw new Error(`Spotify rejected the redirect URL. Add this exact URL in your Spotify app settings: ${redirectUri}`);
    }

    if (message.includes('access denied') || message.includes('cancel')) {
      throw new Error('Spotify login was cancelled. Please try again.');
    }

    throw new Error(`Spotify login failed: ${message || 'Unknown error'}`);
  }

  if (!responseUrl) {
    throw new Error('The sign-in window closed before the authorization completed.');
  }

  try {
    const { code, state: returnedState } = parseAuthResponse(responseUrl);

    if (!code) {
      throw new Error('Spotify did not return an authorization code.');
    }

    if (returnedState !== state) {
      throw new Error('The authentication request was interrupted. Please try again.');
    }

    return exchangeCodeForToken(code, redirectUri, pkce.verifier);
  } catch (error) {
    const message = error?.message || 'Unknown redirect error';

    if (message.includes('Invalid redirect')) {
      throw new Error(`Spotify rejected the redirect URL. Add this exact URL in your Spotify app settings: ${redirectUri}`);
    }

    throw error;
  }
}

// Turn runtime errors into user-friendly messages for the popup UI.
export function getFriendlyAuthError(error) {
  if (!error) {
    return 'Authentication failed.';
  }

  if (error.message) {
    return error.message;
  }

  return 'Spotify authentication could not be completed.';
}
