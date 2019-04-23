import { Command } from 'axoncore';

class Warn extends Command {
    constructor(module) {
        super(module);

        this.label = 'warn';
        this.aliases = ['warn'];

        this.hasSubcmd = false;

        this.infos = {
            owner: ['KhaaZ'],
            name: 'warn',
            description: 'Warn a member.',
            usage: 'warn <member> [reason]',
            examples: ['warn Khaaz#0001 too op'],
        };

        this.options.argsMin = 1;
        this.options.cooldown = 3000;
        this.options.guildOnly = false;

        this.permissions.user.bypass = ['manageGuild', 'administrator'];
        this.permissions.rolesID.needed = [this.axon.configs.axon.moderationRole];
        this.permissions.rolesID.bypass = [this.axon.configs.axon.administrationRole];
    }

    async execute( { msg, args } ) {
        const member = this.Resolver.member(msg.channel.guild, args.shift() );
        if (!this.module.canExecute(msg, member) ) {
            return null;
        }

        const reason = args.length > 0 ? args.join(' ') : 'Pas de raison';

        this.module.log('Warn', member, msg.member, reason);

        try {
            this.AxonUtils.sendDM(member, `Vous avez ete warn pour: ${reason}`);
        } catch (err) {
            return this.sendError(msg.channel, 'Cet utilisateur a les DMs desactivés. Warn log malgré tout.');
        }

        return this.sendSuccess(msg.channel, `${member.username}#${member.discriminator} a ete warn.`);
    }
}

export default Warn;
