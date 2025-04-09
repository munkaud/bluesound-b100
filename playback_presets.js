// playback_presets.js
module.exports = (self) => [
    {
        type: 'button',
        category: 'Playback Controls',
        name: 'Play/Pause',
        style: {
            text: 'Play\n/Pause\n⏯️',
            size: '14',
            color: '16777215',
            bgcolor: '0',
        },
        steps: [
            {
                down: [{ actionId: 'play_pause' }],
                up: [],
            },
        ],
        feedbacks: [],
    },
    {
        type: 'button',
        category: 'Playback Controls',
        name: 'Skip',
        style: {
            text: 'Next\n⏭️',
            size: '14',
            color: '16777215',
            bgcolor: '0',
        },
        steps: [
            {
                down: [{ actionId: 'skip' }],
                up: [],
            },
        ],
        feedbacks: [],
    },
    {
        type: 'button',
        category: 'Playback Controls',
        name: 'Back',
        style: {
            text: 'Last\n⏮️',
            size: '14',
            color: '16777215',
            bgcolor: '0',
        },
        steps: [
            {
                down: [{ actionId: 'back' }],
                up: [],
            },
        ],
        feedbacks: [],
    },
    {
        type: 'button',
        category: 'Volume Controls',
        name: 'Volume Up',
        style: {
            text: 'Vol +\n🔊',
            size: '14',
            color: '16777215',
            bgcolor: '0',
        },
        steps: [
            {
                down: [{ actionId: 'volumeUp' }],
                up: [],
            },
        ],
        feedbacks: [],
    },
    {
        type: 'button',
        category: 'Volume Controls',
        name: 'Volume Down',
        style: {
            text: 'Vol -\n🔉',
            size: '14',
            color: '16777215',
            bgcolor: '0',
        },
        steps: [
            {
                down: [{ actionId: 'volumeDown' }],
                up: [],
            },
        ],
        feedbacks: [],
    },
    {
        type: 'button',
        category: 'Volume Controls',
        name: 'Mute',
        style: {
            text: 'Mute\n🔇',
            size: '14',
            color: '16777215',
            bgcolor: '0',
        },
        steps: [
            {
                down: [{ actionId: 'muteToggle', options: { mute: 1 } }],
                up: [],
            },
        ],
        feedbacks: [],
    },
    {
        type: 'button',
        category: 'Volume Controls',
        name: 'Unmute',
        style: {
            text: 'Unmute\n🔈',
            size: '14',
            color: '16777215',
            bgcolor: '0',
        },
        steps: [
            {
                down: [{ actionId: 'muteToggle', options: { mute: 0 } }],
                up: [],
            },
        ],
        feedbacks: [],
    },
    {
        type: 'button',
        category: 'Volume Controls',
        name: 'Set Volume 50',
        style: {
            text: 'Vol 50\n🎚️',
            size: '14',
            color: '16777215',
            bgcolor: '0',
        },
        steps: [
            {
                down: [{ actionId: 'setVolume', options: { level: 50 } }],
                up: [],
            },
        ],
        feedbacks: [],
    },
];