const { combineRgb } = require('@companion-module/base');

module.exports = (self) => ({
  play_state: {
    type: 'advanced',
    label: 'Play State',
    options: [],
    callback: () => {
      return self.state.playing
        ? { text: 'Playing ⏯️', bgcolor: combineRgb(34, 139, 34), color: combineRgb(255, 255, 255) }
        : { text: 'Paused ⏯️', bgcolor: combineRgb(255, 215, 0), color: combineRgb(0, 0, 0) }; // Gold-yellow
    },
  },
  mute_state: {
    type: 'advanced',
    label: 'Mute State',
    options: [],
    callback: () => {
      return self.state.mute === 1
        ? { text: 'Muted 🔇', bgcolor: combineRgb(139, 0, 0), color: combineRgb(255, 255, 255) }
        : { text: 'Unmuted 🔈', bgcolor: combineRgb(34, 139, 34), color: combineRgb(255, 255, 255) };
    },
  },
});