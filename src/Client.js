'use strict';

const { AxonClient, Resolver } = require('axoncore');

const modules = require('./modules/index');

/**
 * Custom client constructor
 *
 * @author KhaaZ
 *
 * @class Client
 * @extends {AxonCore.AxonClient}
 */
class Client extends AxonClient {
    constructor(client, axonOptions) {
        super(client, axonOptions, modules);

        this.Resolver = Resolver;
    }

    initStaff() {
        // Called after initOwners has run
        // setup bot staff as per your convenience. Can be anything
        this.staff.contributor = [];
    }

    init() {
        return Promise.resolve();
    }

    initStatus() {
        // called after ready event
        // overrides default editStatus
        // used to setup custom status
        this.client.editStatus(null, {
            name: `AxonCore | ${this.params.prefix[0]}help`,
            type: 0,
        });
    }

    $sendFullHelp(msg) {
        // override sendFullHelp method
        return this.AxonUtils.sendMessage(msg.channel, 'Full Help override');
    }

    $sendHelp(command, msg) {
        // override sendHelp method
        return this.AxonUtils.sendMessage(msg.channel, `Help override for ${command.label}`);
    }
}

module.exports = Client;
