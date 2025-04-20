const { combineRgb } = require('@companion-module/base');

module.exports = (self) => [
  {
    type: 'button',
    category: 'Playback',
    name: 'Play/Pause',
    style: {
      text: 'Play/Pause\n⏯️',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'play_pause', options: {} }],
        up: [],
      },
    ],
    feedbacks: [{ feedbackId: 'play_state', options: {} }],
  },
  {
    type: 'button',
    category: 'Playback',
    name: 'Skip',
    style: {
      text: 'Next\n⏭️',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'skip', options: {} }],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Playback',
    name: 'Back',
    style: {
      text: 'Previous\n⏮️',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'back', options: {} }],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Volume',
    name: 'Volume Up',
    style: {
      text: '⬆️',
      size: '18',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'volume_up', options: {} }],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Volume',
    name: 'Volume Down',
    style: {
      text: '⬇️',
      size: '18',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'volume_down', options: {} }],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Volume',
    name: 'Mute/Unmute',
    style: {
      text: '🔇',
      size: '18',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'mute_toggle', options: { mute: self.state.mute === 1 ? 0 : 1 } }],
        up: [],
      },
    ],
    feedbacks: [{ feedbackId: 'mute_state', options: {} }],
  },
  {
    type: 'button',
    category: 'Volume',
    name: 'Set Volume 25',
    style: {
      text: 'Vol 25\n🎚️',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'set_volume', options: { level: 25 } }],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Volume',
    name: 'Set Volume 50',
    style: {
      text: 'Vol 50\n🎚️',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'set_volume', options: { level: 50 } }],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Volume',
    name: 'Set Volume 75',
    style: {
      text: 'Vol 75\n🎚️',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'set_volume', options: { level: 75 } }],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Service',
    name: 'Switch to Tidal',
    style: {
      text: 'Tidal\n🎵',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'switch_service', options: { service: 'TIDAL' } }],
        up: [],
      },
    ],
    feedbacks: [],
  },
  {
    type: 'button',
    category: 'Search',
    name: 'Search Tidal',
    style: {
      text: 'Search Tidal\n🔍',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'search_service', options: { service: 'TIDAL', term: 'The Beatles' } }],
        up: [],
      },
    ],
    feedbacks: [{ feedbackId: 'search_results', options: {} }],
  },
];