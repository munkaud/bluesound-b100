const { InstanceBase, InstanceStatus } = require('@companion-module/base')

class BluesoundInstance extends InstanceBase {
    async init(config) {
        this.config = config
        this.updateStatus(InstanceStatus.Ok)
        this.log('info', 'Bluesound Module Initialized')

        this.initActions()
    }

    // Define the Companion config fields (like IP address)
    async configUpdated(config) {
        this.config = config
        this.log('info', `Config updated: IP = ${config.ip}`)
    }

    // Define the fields for Companion UI
    getConfigFields() {
        return [
            {
                type: 'textinput',
                id: 'ip',
                label: 'Bluesound Device IP Address',
                width: 6,
                regex: this.REGEX_IP
            }
        ]
    }

    // Create the actions available in Companion
    initActions() {
        this.setActionDefinitions({
            recall_preset: {
                name: 'Recall Preset',
                options: [
                    {
                        type: 'number',
                        id: 'preset',
                        label: 'Preset Number',
                        min: 1,
                        max: 10,
                        default: 1
                    }
                ],
                callback: async (action) => {
                    this.recallPreset(action.options.preset)
                }
            }
        })
    }

    // Send a command to the Bluesound player
    async recallPreset(preset) {
        if (this.config.ip) {
            const url = `http://${this.config.ip}:11000/Playlist?service=preset&preset=${preset}`
            try {
                const response = await fetch(url)
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
                this.log('info', `Recalled preset ${preset}`)
            } catch (error) {
                this.log('error', `Failed to recall preset: ${error.message}`)
            }
        } else {
            this.log('error', 'IP address not set')
        }
    }
}

// This will export the module for use with Companion
module.exports = BluesoundInstance