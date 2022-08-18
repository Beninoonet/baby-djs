const { EmbedBuilder, GuildMember } = require('discord.js');
    module.exports = {
        name: 'guildMemberRemove',
        /**
         * 
         * @param {GuildMember} member
         */
        execute(member) {
            const joinEmbed = new EmbedBuilder()
                .setTitle(`${member.user.tag} a quitté ${member.guild.name}`)
                .setColor('Red')
                .setThumbnail(member.displayAvatarURL())
                .setTimestamp()
            member.guild.channels.cache.get('1009509499788345425').send({embeds: [joinEmbed]})   
        },
};