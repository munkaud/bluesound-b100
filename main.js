const { InstanceBase, InstanceStatus, TCPHelper, runEntrypoint } = require('@companion-module/base');

class BluesoundTest extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.socket = null;
  }

  async init(config) {
    this.config = config;
    this.log('info', 'Bluesound Test Loaded');
    this.updateStatus(InstanceStatus.Ok);
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'IP Address', width: 6, default: '192.168.1.100' },
      { type: 'number', id: 'port', label: 'Port', width: 4, default: 11000, min: 1, max: 65535 }
    ];
  }

  async destroy() {
    this.log('info', 'Instance destroyed');
  }
}

runEntrypoint(BluesoundTest, []);