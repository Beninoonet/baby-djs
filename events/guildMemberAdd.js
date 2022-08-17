const { CommandInteraction, EmbedBuilder, GuildMember } = require('discord.js');
    module.exports = {
        name: 'guildMemberAdd',
        /**
         * 
         * @param {CommandInteraction} interaction
         * @param {GuildMember} member
         */
        execute(interaction, member) {
            const joinedMsg = new EmbedBuilder()
                .setColor('Green')
                .setTitle(`Welcome ${member.user}`)
                interaction.guild.channels.cache.get('1009509499788345425').send()
        },
};