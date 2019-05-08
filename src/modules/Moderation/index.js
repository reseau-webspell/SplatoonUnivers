import { Module } from 'axoncore';

import * as commands from './commands/index';
// import events from './events/index';

const TYPE = {
    Warn: '<a:yes:568403437692387328>',
    Kick: '<a:no:568403433565192202>',
    Ban: '<a:no:568403433565192202>',
    Mute: '<a:maybe:568403438359019536>',
    Unmute: '<a:maybe:568403438359019536>',
    Unban: '<a:no:568403433565192202>',
};

class Moderation extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Moderation';

        this.enabled = true;
        this.serverBypass = false;

        this.infos = {
            name: 'Moderation',
            description: 'Moderation commands.',
        };

        this.init(commands);

        this._modlogChannels = this.axon.configs.axon.modlogChannels;
    }

    canExecute(msg, member) {
        if (!member) {
            this.sendMessage(msg.channel, '<:FOND:540187797299134464>\n<a:no:568403433565192202> | `CET UTILISATEUR N\'A PAS ETE TROUVE.`\n<:FOND:540187797299134464>');
            return false;
        }

        const botMember = msg.channel.guild.members.get(this.bot.user.id);
        if (botMember.roles.length === 0 || member.roles.length === 0) {
            if ( !this.Utils.isHigherRole(msg.channel.guild, botMember, member) ) {
                this.sendError(msg.channel, 'Je n\'ai pas un role suffisamment haut pour effectuer cette action');
                return false;
            }
        }

        if (this.Utils.hasPerms(member, ['manageGuild', 'administrator'] )
            || member.roles.includes(this.axon.configs.axon.moderationRole)
            || member.roles.includes(this.axon.configs.axon.administrationrole) ) {
            this.sendMessage(msg.channel, '<:FOND:540187797299134464>\n<a:no:568403433565192202> | `IMPOSSIBLE, CET UTILISATEUR EST MEMBRE DU STAFF.`\n<:FOND:540187797299134464>');
            return false;
        }

        return true;
    }

    async log(channel, type, target, responsible, reason) {
        const emote = TYPE[type];
        
        const embed = {
            color: 0x36393f,
            title: `<:Infraction:568400769783431174> **INFRACTION ${emote} ${type}**`,
            description: `\u200b\n**Utilisateur:** ${target.username ? `${target.username}#${target.discriminator}` : target}\n**Raison:** ${reason}\n**Moderateur:** ${responsible.username}#${responsible.discriminator}\n\u200b`,
            timestamp: new Date(),
            footer: {
                text: `ID: ${target.id}`,
            },
        };

        if (type !== 'Unmute' && type !== 'Unban') {
            try {
                await this.AxonUtils.sendDM(target, { embed } );
            } catch (err) {
                this.sendMessage(channel, '<:FOND:540187797299134464>\n<a:no:568403433565192202>  | `JE NE PEUX PAS ENVOYER DE MESSAGES PRIVÉS A CET UTILISATEUR.`\n<:FOND:540187797299134464>');
            }
        }

        for (const chan of this._modlogChannels) {
            this.bot.createMessage(chan, { embed } );
        }

        return this.sendMessage(channel, { embed } );
    }
}

export default Moderation;
