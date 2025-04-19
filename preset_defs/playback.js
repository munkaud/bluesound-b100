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
      text: 'Vol +\n🔊',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'volume_up', options: {} }],
        up: [],
      },
    ],
    feedbacks: [{ feedbackId: 'mute_state', options: {} }],
  },
  {
    type: 'button',
    category: 'Volume',
    name: 'Volume Down',
    style: {
      text: 'Vol -\n🔉',
      size: '14',
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
      {
        down: [{ actionId: 'volume_down', options: {} }],
        up: [],
      },
    ],
    feedbacks: [{ feedbackId: 'mute_state', options: {} }],
  },
  {
    type: 'button',
    category: 'Volume',
    name: 'Mute/Unmute',
    style: {
      text: 'Mute\n🔇',
      size: '14',
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
    feedbacks: [{ feedbackId: 'mute_state', options: {} }],
  },
];