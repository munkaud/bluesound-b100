const { combineRgb } = require('@companion-module/base');

module.exports = (self) => ({
  play_state: {
    type: 'advanced',
    label: 'Play State',
    options: [],
    callback: () => {
      return self.state.playing
        ? { text: 'Playing ⏯️', bgcolor: combineRgb(34, 139, 34), color: combineRgb(255, 255, 255) }
        : { text: 'Paused ⏯️', bgcolor: combineRgb(255, 215, 0), color: combineRgb(0, 0, 0) };
    },
  },
  mute_state: {
    type: 'advanced',
    label: 'Mute State',
    options: [],
    callback: () => {
      return self.state.mute === 1
        ? { text: '🔇', bgcolor: combineRgb(139, 0, 0), color: combineRgb(255, 255, 255) }
        : { text: '🔉', bgcolor: combineRgb(34, 139, 34), color: combineRgb(255, 255, 255) };
    },
  },
  search_results: {
    type: 'advanced',
    label: 'Search Results',
    options: [],
    callback: () => {
      return self.state.searchResults.length > 0
        ? { text: `Found ${self.state.searchResults.length}`, bgcolor: combineRgb(0, 102, 204), color: combineRgb(255, 255, 255) }
        : { text: 'No Results', bgcolor: combineRgb(128, 128, 128), color: combineRgb(255, 255, 255) };
    },
  },
});