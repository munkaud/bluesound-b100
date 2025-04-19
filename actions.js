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
      }
    },
  },
  skip: {
    name: 'Skip',
    options: [],
    callback: async () => {
      await connection.sendCommand(self, '/Skip');
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
    },
  },
  volume_up: {
    name: 'Volume Up',
    options: [],
    callback: async () => {
      const data = await connection.sendCommand(self, '/Volume?up');
      if (data?.volume?.[0]) {
        self.state.volume = parseInt(data.volume[0] || self.state.volume);
        self.state.mute = parseInt(data.mute?.[0] || self.state.mute);
        self.checkFeedbacks('mute_state');
      }
    },
  },
  volume_down: {
    name: 'Volume Down',
    options: [],
    callback: async () => {
      const data = await connection.sendCommand(self, '/Volume?down');
      if (data?.volume?.[0]) {
        self.state.volume = parseInt(data.volume[0] || self.state.volume);
        self.state.mute = parseInt(data.mute?.[0] || self.state.mute);
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
      const data = await connection.sendCommand(self, `/Volume?mute=${mute}`);
      if (data?.volume?.[0]) {
        self.state.volume = parseInt(data.volume[0] || self.state.volume);
        self.state.mute = parseInt(data.mute?.[0] || mute);
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
      const data = await connection.sendCommand(self, `/Volume?level=${level}`);
      if (data?.volume?.[0]) {
        self.state.volume = parseInt(data.volume[0] || level);
        self.state.mute = parseInt(data.mute?.[0] || 0);
        self.checkFeedbacks('mute_state');
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
      const data = await connection.sendCommand(self, `/Search?service=${service}&query=${term}`, 80);
      self.state.searchResults = data?.search?.item || [];
      self.log('info', `Found ${self.state.searchResults.length} results`);
      self.checkFeedbacks('search_results');
    },
  },
});