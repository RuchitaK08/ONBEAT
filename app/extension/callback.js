const redirectTarget = window.location.href;
const parsed = new URL(redirectTarget);

if (parsed.searchParams.has('code') || parsed.searchParams.has('error')) {
  window.location.replace(parsed.href);
} else {
  document.body.innerHTML = '<div style="font-family: Arial, sans-serif; color: #f5f7ff; text-align: center; padding: 24px;">Unable to complete Spotify login. Please try again.</div>';
}
