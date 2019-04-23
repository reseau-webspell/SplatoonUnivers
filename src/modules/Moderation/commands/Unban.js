import { Command } from 'axoncore';

class Unban extends Command {
    constructor(module) {
        super(module);

        this.label = 'unban';
        this.aliases = ['unban'];
        this.hasSubcmd = false;

        this.infos = {
            owner: ['KhaaZ'],
            name: 'unban',
            description: 'Unban a member.',
            usage: 'unban <member> [reason]',
            examples: ['unban Khaaz#0001 too op'],
        };

        this.options.argsMin = 1;
        this.options.cooldown = 3000;
        this.options.guildOnly = false;

        this.permissions.bot = ['sendMessages', 'banMembers'];
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
        const fullReason = `${reason} - Unbanned by ${msg.author.username}#${msg.author.discriminator}`;

        const bannedUsers = await msg.channel.guild.getBans();

        if (!bannedUsers.find(i => i.user.id === member.id) ) {
            return this.sendError(msg.channel, `Cet utilisateur n'est pas banni.`);
        }

        try {
            await this.bot.unbanGuildMember(msg.channel.guild.id, member.id, fullReason);
        } catch (err) {
            return this.sendError(msg.channel, `Je ne peux pas unban ${member.username}#${member.discriminator}.`);
        }

        this.module.log('Unban', member, msg.member, reason);

        return this.sendSuccess(msg.channel, `${member.username}#${member.discriminator} a ete unban du serveur.`);
    }
}

export default Unban;
