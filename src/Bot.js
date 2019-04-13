'use strict';

const Client = require('./Client');
const Eris = require('eris');

const axonConf = require('./configs/customConf.json');
const tokenConf = require('./configs/tokenConf.json');
const templateConf = require('./configs/templateConf.json');

const LoCUtils = require('./LoCUtils');

const AxonOptions = {
    axonConf,
    templateConf,
    tokenConf,

    resolver: null,
    utils: LoCUtils,
};

const client = new Eris.Client(
    tokenConf.bot.token,
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        disableEveryone: true,
        getAllUsers: true,
        messageLimit: 100,
        restMode: true,
    }
);
const Bot = new Client(
    client,
    AxonOptions
);

module.exports = Bot;
