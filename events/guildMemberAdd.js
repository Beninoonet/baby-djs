const { EmbedBuilder, GuildMember } = require('discord.js');
    module.exports = {
        name: 'guildMemberAdd',
        /**
         * 
         * @param {GuildMember} member
         */
        execute(member) {
            const joinEmbed = new EmbedBuilder()
                .setTitle(`${member.user.tag} a rejoint ${member.guild.name}`)
                .setColor('Green')
                .setThumbnail(member.displayAvatarURL())
                .setTimestamp();

            member.guild.channels.cache.get('1009509499788345425').send({embeds: [joinEmbed]})

            member.roles.add('1008784184782884924');
                
        },
};