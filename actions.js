// actions.js
const { parseStringPromise } = require('xml2js');

async function sendCommand(self, command) {
    try {
        const url = `http://${self.config.host}:${self.config.port}${command}`;
        self.log('debug', `Sending command: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            self.log('error', `Failed to send command: ${response.statusText} (${response.status})`);
            return;
        }
        const responseText = await response.text();
        try {
            const jsonResponse = await parseStringPromise(responseText);
            self.log('info', `Received parsed response: ${JSON.stringify(jsonResponse)}`);
            return jsonResponse; // Optional, if we need it later
        } catch (err) {
            self.log('error', `Error parsing XML response: ${err.message}`);
        }
    } catch (err) {
        self.log('error', `Network error: ${err.message}`);
    }
}

function getActions(self) {
    return {
        'play_pause': {
            name: 'Play/Pause',
            options: [],
            callback: async () => {
                await sendCommand(self, '/Pause?toggle=1');
            },
        },
        'skip': {
            name: 'Skip',
            options: [],
            callback: async () => {
                await sendCommand(self, '/Skip');
            },
        },
        'back': {
            name: 'Back',
            options: [],
            callback: async () => {
                await sendCommand(self, '/Back');
            },
        },
        'volumeUp': {
            name: 'Volume Up',
            options: [],
            callback: async () => {
                await sendCommand(self, '/Volume?up');
            },
        },
        'volumeDown': {
            name: 'Volume Down',
            options: [],
            callback: async () => {
                await sendCommand(self, '/Volume?down');
            },
        },
        'muteToggle': {
            name: 'Mute Toggle',
            options: [
                { type: 'number', label: 'Mute (1) or Unmute (0)', id: 'mute', default: 1, min: 0, max: 1 },
            ],
            callback: async (event) => {
                const mute = event.options.mute;
                await sendCommand(self, `/Volume?mute=${mute}`);
            },
        },
        'setVolume': {
            name: 'Set Volume',
            options: [
                { type: 'number', label: 'Volume Level (0-100)', id: 'level', default: 50, min: 0, max: 100 },
            ],
            callback: async (event) => {
                const level = event.options.level;
                await sendCommand(self, `/Volume?level=${level}`);
            },
        },
    };
}

module.exports = { getActions };