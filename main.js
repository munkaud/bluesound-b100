const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base');
const { parseStringPromise } = require('xml2js');
const fetch = require('node-fetch');

class BluesoundInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.state = {
      volume: 0,
      mute: 0,
      playing: false
    };
  }

  async init(config) {
    this.config = config || { host: '192.168.100.1', port: 11000 };
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
      { type: 'textinput', id: 'host', label: 'B100 IP Address', width: 6, default: '192.168.12.208', required: true },
      { type: 'number', id: 'port', label: 'Port', default: 11000, min: 1, max: 65535, required: true }
    ];
  }

  async pollStatus() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
    if (this.config.host && this.config.port) {
      this.pollTimer = setInterval(async () => {
        try {
          const response = await fetch(`http://${this.config.host}:${this.config.port}/Status`);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          const xml = await response.text();
          const data = await parseStringPromise(xml);
          const status = data.status || {};
          this.state.volume = parseInt(status.volume?.[0]?._ || 0);
          this.state.mute = parseInt(status.volume?.[0]?.$?.mute || 0);
          this.state.playing = status.state?.[0] === 'play';
          this.updateStatus(InstanceStatus.Ok);
          this.checkFeedbacks('play_state', 'mute_state');
          this.log('debug', `Status: volume=${this.state.volume}, mute=${this.state.mute}, playing=${this.state.playing}`);
        } catch (err) {
          this.updateStatus(InstanceStatus.Error, 'API Error');
          this.log('error', `Poll Error: ${err.message}`);
        }
      }, 1000);
    } else {
      this.updateStatus(InstanceStatus.BadConfig);
      this.log('error', 'Configuration incomplete');
    }
  }
}

runEntrypoint(BluesoundInstance, []);