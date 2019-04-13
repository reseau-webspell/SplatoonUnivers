'use strict';

const { Event } = require('axoncore');

class MessageCreateMod extends Event {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'messageCreate';
        /** Event name (Function name) */
        this.label = 'messageCreateMod';

        this.enabled = true;

        this.infos = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    execute(message, guildConf) { // eslint-disable-line
        console.log(`Prefix: ${guildConf.prefix}`);
        return Promise.resolve();
    }
}

module.exports = MessageCreateMod;
