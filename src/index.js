'use strict';

const Bot = require('./Bot');
const customConf = require('./configs/customConf.json');

if (customConf.db === 1) {
    try {
        const mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/loc-erisDB', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            autoReconnect: true,
        })
            .then(() => {
                Bot.Logger.notice('Connected to loc-erisDB DataBase.');
            })
            .catch(err => {
                Bot.Logger.emerg('Could NOT connect to loc-erisDB DataBase.\n' + err.stack);
            });
    } catch (e) {
        Bot.Logger.emerg('Could NOT connect to loc-erisDB DataBase.\n' + e.stack);
    }
}

Bot.start();

Bot.Logger.notice('=== ONLINE ===');
