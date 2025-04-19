const { parseStringPromise } = require('xml2js');
const fetch = require('node-fetch');

async function sendCommand(self, command, portOverride = null) {
  try {
    const port = portOverride || self.config.port;
    const url = `http://${self.config.host}:${port}${command}`;
    self.log('debug', `Sending command: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      self.log('error', `Failed to send command: ${response.statusText} (${response.status})`);
      return null;
    }
    const xml = await response.text();
    const json = await parseStringPromise(xml);
    self.log('debug', `Received: ${JSON.stringify(json)}`);
    return json;
  } catch (err) {
    self.log('error', `Network error: ${err.message}`);
    return null;
  }
}

module.exports = { sendCommand };