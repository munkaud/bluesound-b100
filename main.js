// console.log('Top-level: Module loading'); // Commented out - only needed for debug

const { InstanceBase, InstanceStatus, TCPHelper, runEntrypoint } = require('@companion-module/base');
const actions = require('./actions');
const feedbacks = require('./feedbacks');
const presets = require('./presets');
const connection = require('./connection');

class BluesoundTest extends InstanceBase {
  constructor(internal) {
    super(internal);
    // console.log('Constructor: Instance created'); // Debug only
    // this.log('debug', 'Constructor called');
    this.socket = null;
    this.searchResults = [];
    this.currentVolume = null;
  }

  async init(config) {
    // console.log('Init: Entering init with config:', config); // Debug only
    // this.log('debug', 'Init started with config: ' + JSON.stringify(config));
    this.config = config || { host: '192.168.1.100', port: 11000 };
    this.updateStatus(InstanceStatus.Connecting);
    // await connection.setupConnection(this); // Still commented - add later
    this.setActionDefinitions(actions.getActions(this));
    this.setFeedbackDefinitions(feedbacks.getFeedbacks(this));
    this.setPresetDefinitions(presets.getPresets(this));
    // this.log('debug', 'Init completed');
    this.log('info', 'Bluesound Test Loaded'); // Keep this - confirms it’s alive
    this.updateStatus(InstanceStatus.Ok);
  }

  async configUpdated(config) {
    this.config = config;
    // this.log('debug', 'Config updated: ' + JSON.stringify(config));
    // await connection.setupConnection(this); // Still commented - add later
  }

  getConfigFields() {
    // this.log('debug', 'getConfigFields called');
    return [
      { type: 'textinput', id: 'host', label: 'B100 IP Address', width: 6, default: '192.168.1.100', required: true },
      { type: 'number', id: 'port', label: 'Port', default: 11000, min: 1, max: 65535, required: true },
    ];
  }

  async destroy() {
    // this.log('debug', 'Destroy called');
    connection.destroyConnection(this);
    this.log('info', 'Instance destroyed'); // Keep this - good to know it’s gone
  }
}

runEntrypoint(BluesoundTest, []);

// console.log('Top-level: Module exported'); // Debug only