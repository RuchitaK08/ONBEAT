import { clearSpotifyAuth, getSpotifyAuth, hasValidSpotifyAuth, saveSpotifyAuth } from './storage.js';

// Initialize the popup UI once the DOM has loaded.
document.addEventListener('DOMContentLoaded', async () => {
    const workout = document.getElementById('workout');
    const bpm = document.getElementById('bpm');
    const spotifyButton = document.getElementById('spotify');
    const generateButton = document.getElementById('generate');
    const statusLabel = document.createElement('p');

    const authModule = await import('./auth.js');
    const { authenticateWithSpotify, getFriendlyAuthError } = authModule;

    if (!workout || !bpm || !spotifyButton || !generateButton) {
        return;
    }

    statusLabel.className = 'status-message';
    spotifyButton.insertAdjacentElement('afterend', statusLabel);

    const bpmMap = {
        Walking: '100 BPM',
        Yoga: '90 BPM',
        Strength: '120 BPM',
        Cycling: '145 BPM',
        Running: '160 BPM',
        HIIT: '170 BPM'
    };

    const updateBpm = () => {
        bpm.textContent = bpmMap[workout.value] || '170 BPM';
    };

    // Restore the auth state from storage when the popup opens.
    const restoreAuthState = async () => {
        const authState = await getSpotifyAuth();

        if (hasValidSpotifyAuth(authState)) {
            setConnectedState();
            return;
        }

        if (authState) {
            await clearSpotifyAuth();
            setErrorMessage('Your Spotify session expired. Please connect again.');
        }
    };

    // Update the button to show a successful connected state.
    const setConnectedState = () => {
        spotifyButton.textContent = '✓ Spotify Connected';
        spotifyButton.disabled = true;
        spotifyButton.classList.add('connected');
        statusLabel.textContent = 'Connected and ready for your workout flow.';
        statusLabel.classList.remove('error');
        statusLabel.classList.add('success');
    };

    // Show helpful feedback when something goes wrong.
    const setErrorMessage = (message) => {
        statusLabel.textContent = message;
        statusLabel.classList.remove('success');
        statusLabel.classList.add('error');
    };

    // Begin OAuth when the connect button is clicked.
    spotifyButton.addEventListener('click', async () => {
        spotifyButton.disabled = true;
        spotifyButton.textContent = 'Connecting...';
        statusLabel.textContent = 'Opening Spotify login...';
        statusLabel.classList.remove('error', 'success');

        try {
            const authState = await authenticateWithSpotify();
            await saveSpotifyAuth(authState);
            setConnectedState();
        } catch (error) {
            const message = getFriendlyAuthError(error);
            setErrorMessage(message);
        } finally {
            if (spotifyButton.textContent === 'Connecting...') {
                spotifyButton.disabled = false;
                spotifyButton.textContent = 'Connect Spotify';
            }
        }
    });

    generateButton.addEventListener('click', () => {
        window.alert('Playlist generation coming soon!');
    });

    workout.addEventListener('change', updateBpm);
    updateBpm();
    await restoreAuthState();
});