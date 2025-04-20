const connection = require('./connection');

module.exports = (self) => ({
  play_pause: {
    name: 'Play/Pause',
    options: [],
    callback: async () => {
      const data = await connection.sendCommand(self, '/Pause?toggle=1');
      if (data?.state) {
        self.state.playing = ['play', 'stream'].includes(data.state);
        self.checkFeedbacks('play_state');
        setTimeout(() => self.fetchStatus(), 1000);
      }
    },
  },
  skip: {
    name: 'Skip',
    options: [],
    callback: async () => {
      await connection.sendCommand(self, '/Skip');
      setTimeout(() => self.fetchStatus(), 1000);
    },
  },
  back: {
    name: 'Back',
    options: [],
    callback: async () => {
      const data = await connection.sendCommand(self, '/Back');
      if (data?.error) {
        self.log('warn', `Back failed: ${data.error}`);
      }
      setTimeout(() => self.fetchStatus(), 1000);
    },
  },
  volume_up: {
    name: 'Volume Up',
    options: [],
    callback: async () => {
      const data = await connection.sendCommand(self, '/Volume?up');
      if (data?.volume?._) {
        self.state.volume = parseInt(data.volume.$?.mute === '1' ? data.volume.$?.muteVolume || data.volume._ : data.volume._ || self.state.volume);
        self.state.mute = parseInt(data.volume.$?.mute || self.state.mute);
        self.checkFeedbacks('mute_state');
        setTimeout(() => self.fetchStatus(), 1000);
      }
    },
  },
  volume_down: {
    name: 'Volume Down',
    options: [],
    callback: async () => {
      const data = await connection.sendCommand(self, '/Volume?down');
      if (data?.volume?._) {
        self.state.volume = parseInt(data.volume.$?.mute === '1' ? data.volume.$?.muteVolume || data.volume._ : data.volume._ || self.state.volume);
        self.state.mute = parseInt(data.volume.$?.mute || self.state.mute);
        self.checkFeedbacks('mute_state');
        setTimeout(() => self.fetchStatus(), 1000);
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
      const data = await connection.sendCommand(self, `/Volume?mute=${mute}`);
      if (data?.volume?._) {
        self.state.volume = parseInt(data.volume.$?.mute === '1' ? data.volume.$?.muteVolume || data.volume._ : data.volume._ || self.state.volume);
        self.state.mute = parseInt(data.volume.$?.mute || mute);
        self.checkFeedbacks('mute_state');
        setTimeout(() => self.fetchStatus(), 1000);
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
      const data = await connection.sendCommand(self, `/Volume?level=${level}`);
      if (data?.volume?._) {
        self.state.volume = parseInt(data.volume.$?.mute === '1' ? data.volume.$?.muteVolume || level : data.volume._ || level);
        self.state.mute = parseInt(data.volume.$?.mute || 0);
        self.checkFeedbacks('mute_state');
        setTimeout(() => self.fetchStatus(), 1000);
      }
    },
  },
  switch_service: {
    name: 'Switch Service',
    options: [
      {
        type: 'dropdown',
        id: 'service',
        label: 'Service',
        default: 'TIDAL',
        choices: [
          { id: 'TIDAL', label: 'Tidal' },
          { id: 'SPOTIFY', label: 'Spotify' },
          { id: 'RadioParadise', label: 'Radio Paradise' }
        ],
      },
    ],
    callback: async (action) => {
      const service = action.options.service;
      const data = await connection.sendCommand(self, `/Service?service=${service}`);
      if (data?.service) {
        self.state.service = data.service;
        self.log('info', `Switched to service: ${self.state.service}`);
        setTimeout(() => self.fetchStatus(), 1000);
      } else {
        self.log('error', `Failed to switch to ${service}`);
      }
    },
  },
  search_service: {
    name: 'Search Service',
    options: [
      {
        type: 'dropdown',
        id: 'service',
        label: 'Service',
        default: 'TIDAL',
        choices: [
          { id: 'TIDAL', label: 'Tidal' },
          { id: 'SPOTIFY', label: 'Spotify' },
          { id: 'RadioParadise', label: 'Radio Paradise' }
        ],
      },
      {
        type: 'textinput',
        id: 'term',
        label: 'Search Term',
        default: ''
      }
    ],
    callback: async (action) => {
      const service = action.options.service;
      const term = encodeURIComponent(action.options.term);
      if (self.state.service !== service) {
        await connection.sendCommand(self, `/Service?service=${service}`);
        self.state.service = service;
        self.log('info', `Switched to service: ${service}`);
      }
      const data = await connection.sendCommand(self, `/Search?service=${service}&query=${term}`, 80);
      self.state.searchResults = data?.search?.item || [];
      self.log('info', `Found ${self.state.searchResults.length} results`);
      self.checkFeedbacks('search_results');
      setTimeout(() => self.fetchStatus(), 1000);
    },
  },
});