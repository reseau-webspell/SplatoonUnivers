import { Command } from 'axoncore';

class Embed extends Command {
    constructor(module) {
        super(module);

        this.label = 'embed';
        this.aliases = ['embed'];

        this.hasSubcmd = false;

        this.infos = {
            owner: ['KhaaZ'],
            name: 'embed',
            description: 'Use the bot to say something.',
            usage: 'embed <color> | <title> | <message>',
            examples: ['say Hello, I am a bot.'],
        };

        this.options.argsMin = 5;
        this.options.cooldown = 3000;
        this.options.guildOnly = true;
        this.options.deleteCommand = true;

        this.permissions.bot = ['sendMessages', 'embedLinks'];
        this.permissions.user.bypass = ['manageGuild', 'administrator'];
        this.permissions.rolesID.needed = [this.axon.configs.axon.moderationRole];
        this.permissions.rolesID.bypass = [this.axon.configs.axon.administrationRole];

        this._colorRE = /[0-9a-fA-F]+/g
    }

    async execute( { msg, args } ) {
        
        const actualArgs = args.join(' ').split(' | ');

        let color = actualArgs.shift();
        const match = color.match(this._colorRE);
        if (match) { 
            color = match.join('');
            color = parseInt(color, 16);
        }
        
        if (!color || isNaN(color)) {
            color = null
        }

        const title = actualArgs.shift();

        const message = actualArgs.shift();

        const embed = {
            color,
            title,
            description: message,
        }

        return this.sendMessage(msg.channel, { embed })
    }
}

export default Embed;
