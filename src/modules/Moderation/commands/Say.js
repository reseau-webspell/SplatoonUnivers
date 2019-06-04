import { Command } from 'axoncore';

class Say extends Command {
    constructor(module) {
        super(module);

        this.label = 'say';
        this.aliases = ['say'];

        this.hasSubcmd = false;

        this.infos = {
            owner: ['KhaaZ'],
            name: 'say',
            description: 'Use the bot to say something.',
            usage: 'say <message>',
            examples: ['say Hello, I am a bot.'],
        };

        this.options.argsMin = 1;
        this.options.cooldown = 3000;
        this.options.guildOnly = true;
        this.options.deleteCommand = true;

        this.permissions.bot = ['sendMessages'];
        this.permissions.user.bypass = ['manageGuild', 'administrator'];
        this.permissions.rolesID.needed = [this.axon.configs.axon.moderationRole];
        this.permissions.rolesID.bypass = [this.axon.configs.axon.administrationRole];
    }

    async execute( { msg, args } ) {
        
        const text = args.join(' ');
        return this.sendMessage(msg.channel, text)
        
    }
}

export default Say;
