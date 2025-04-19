// actions.js

const { parseStringPromise } = require('xml2js');
const fetch = require('node-fetch');

async function sendCommand(self, command) {
  try {
    const url = `http://${self.config.host}:${self.config.port}${command}`;
    self.log('debug', `Sending command: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      self.log('error', `Failed to send command: ${response.statusText} (${response.status})`);
      return null;
    }
    const xml = await response.text();
    const json = await parseStringPromise(xml);
    self.log('debug', `Received: ${JSON.stringify(json)}`);
    return json;
  } catch (err) {
    self.log('error', `Network error: ${err.message}`);
    return null;
  }
}

module.exports = (self) => ({
  play_pause: {
    name: 'Play/Pause',
    options: [],
    callback: async () => {
      const data = await sendCommand(self, '/Pause?toggle=1');
      if (data?.state) {
        self.state.playing = data.state === 'play';
        self.checkFeedbacks('play_state');
      }
    },
  },
  skip: {
    name: 'Skip',
    options: [],
    callback: async () => {
      await sendCommand(self, '/Skip');
    },
  },
  back: {
    name: 'Back',
    options: [],
    callback: async () => {
        await sendCommand(self, '/Back');
    },
},
  volume_up: {
    name: 'Volume Up',
    options: [],
    callback: async () => {
      const data = await sendCommand(self, '/Volume?up');
      if (data?.volume?.[0]?._) {
        self.state.volume = parseInt(data.volume[0]._ || self.state.volume);
        self.state.mute = parseInt(data.volume[0].$.mute || self.state.mute);
        self.checkFeedbacks('mute_state');
      }
    },
  },
  volume_down: {
    name: 'Volume Down',
    options: [],
    callback: async () => {
      const data = await sendCommand(self, '/Volume?down');
      if (data?.volume?.[0]?._) {
        self.state.volume = parseInt(data.volume[0]._ || self.state.volume);
        self.state.mute = parseInt(data.volume[0].$.mute || self.state.mute);
        self.checkFeedbacks('mute_state');
      }
    },
  },
  mute_toggle: {
    name: 'Mute Toggle',
    options: [
      { type: 'number', label: 'Mute (1) or Unmute (0)', id: 'mute', default: 1, min: 0, max: 1 }
    ],
    callback: async (event) => {
      const mute = event.options.mute;
      const data = await sendCommand(self, `/Volume?mute=${mute}`);
      if (data?.volume?.[0]?._) {
        self.state.volume = parseInt(data.volume[0]._ || self.state.volume);
        self.state.mute = parseInt(data.volume[0].$.mute || mute);
        self.checkFeedbacks('mute_state');
      }
    },
  },
  set_volume: {
    name: 'Set Volume',
    options: [
      { type: 'number', label: 'Volume Level (0-100)', id: 'level', default: 50, min: 0, max: 100 }
    ],
    callback: async (event) => {
      const level = event.options.level;
      const data = await sendCommand(self, `/Volume?level=${level}`);
      if (data?.volume?.[0]?._) {
        self.state.volume = parseInt(data.volume[0]._ || level);
        self.state.mute = parseInt(data.volume[0].$.mute || 0);
        self.checkFeedbacks('mute_state');
      }
    },
  },
});
        