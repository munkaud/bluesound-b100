const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base');
const connection = require('./connection');

class BluesoundInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.state = {
      volume: 0,
      mute: 0,
      playing: false,
      service: '',
      searchResults: []
    };
    this.lastStatusPoll = 0;
  }

  async init(config) {
    this.config = config || { host: '192.168.100.1', port: 11001 };
    this.updateStatus(InstanceStatus.Connecting);
    this.setActionDefinitions(require('./actions')(this));
    this.setFeedbackDefinitions(require('./feedbacks')(this));
    this.setPresetDefinitions(require('./preset_defs/playback')(this));
    this.log('info', 'Bluesound B100 Loaded');
    this.pollStatus();
  }

  async destroy() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
    this.log('info', 'Instance destroyed');
  }

  async configUpdated(config) {
    this.config = config;
    this.pollStatus();
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'B100 IP Address', width: 6, default: '192.168.100.1', required: true },
      { type: 'number', id: 'port', label: 'Port', default: 11001, min: 1, max: 65535, required: true }
    ];
  }

  async pollStatus() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
    if (this.config.host && this.config.port) {
      this.pollTimer = setInterval(async () => {
        await this.fetchStatus();
      }, 15000);
      await this.fetchStatus();
    } else {
      this.updateStatus(InstanceStatus.BadConfig);
      this.log('error', 'Configuration incomplete');
    }
  }

  async fetchStatus() {
    const now = Date.now();
    if (now - this.lastStatusPoll < 3000) {
      this.log('debug', 'Skipping status poll due to recent request');
      return;
    }
    this.lastStatusPoll = now;
    try {
      const data = await connection.sendCommand(this, '/Status');
      const status = data?.status || {};
      this.state.volume = parseInt(status.mute?.[0] === '1' ? status.muteVolume?.[0] || status.volume?.[0] : status.volume?.[0] || 0);
      this.state.mute = parseInt(status.mute?.[0] || 0);
      this.state.playing = ['play', 'stream'].includes(status.state?.[0]);
      this.state.service = status.service?.[0] || '';
      this.updateStatus(InstanceStatus.Ok);
      this.checkFeedbacks('play_state', 'mute_state');
      this.log('debug', `Status: volume=${this.state.volume}, mute=${this.state.mute}, playing=${this.state.playing}, service=${this.state.service}`);
    } catch (err) {
      this.updateStatus(InstanceStatus.Error, 'API Error');
      this.log('error', `Poll Error: ${err.message}`);
    }
  }
}

runEntrypoint(BluesoundInstance, []);