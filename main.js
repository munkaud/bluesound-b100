// main.js
const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base');
const actions = require('./actions');
const feedbacks = require('./feedbacks');
const playbackPresets = require('./playback_presets');
const connection = require('./connection');

class BluesoundTest extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.socket = null;
    this.searchResults = [];
    this.currentVolume = null;
  }

  // main.js (init method)
async init(config) {
  this.config = config || { host: '192.168.1.100', port: 11000 };
  this.updateStatus(InstanceStatus.Connecting);
  const actionDefs = actions.getActions(this);
  //this.log('debug', 'Actions being set: ' + JSON.stringify(actionDefs, null, 2));
  this.setActionDefinitions(actionDefs);
  this.setFeedbackDefinitions(feedbacks.getFeedbacks(this));
  const presets = playbackPresets(this); // Changed from playbackPresets.getPlaybackControls(this)
  //this.log('debug', 'Presets being set: ' + JSON.stringify(presets, null, 2));
  this.setPresetDefinitions(presets);
  this.log('debug', 'Presets set completed');
  this.log('info', 'Bluesound Test Loaded');
  this.updateStatus(InstanceStatus.Ok);
}

  async configUpdated(config) {
    this.config = config;
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'B100 IP Address', width: 6, default: '192.168.1.100', required: true },
      { type: 'number', id: 'port', label: 'Port', default: 11000, min: 1, max: 65535, required: true },
    ];
  }

  async destroy() {
    connection.destroyConnection(this);
    this.log('info', 'Instance destroyed');
  }
}

runEntrypoint(BluesoundTest, []);