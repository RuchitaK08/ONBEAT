import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAuthUrl, parseAuthResponse } from './auth.js';

test('buildAuthUrl includes the expected Spotify OAuth parameters', () => {
  const url = buildAuthUrl('https://example.test/callback', 'challenge-value', 'state-value');
  const parsed = new URL(url);

  assert.equal(parsed.origin + parsed.pathname, 'https://accounts.spotify.com/authorize');
  assert.equal(parsed.searchParams.get('client_id'), 'fb59babdf2364cec8eefcbebc007190e');
  assert.equal(parsed.searchParams.get('response_type'), 'code');
  assert.equal(parsed.searchParams.get('redirect_uri'), 'https://example.test/callback');
  assert.equal(parsed.searchParams.get('code_challenge'), 'challenge-value');
  assert.equal(parsed.searchParams.get('code_challenge_method'), 'S256');
  assert.equal(parsed.searchParams.get('state'), 'state-value');
});

test('parseAuthResponse reads the code and state from the redirect URL', () => {
  const result = parseAuthResponse('https://example.test/callback?code=auth-code&state=test-state');

  assert.deepEqual(result, { code: 'auth-code', state: 'test-state' });
});
