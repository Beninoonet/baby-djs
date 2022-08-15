const { CommandInteraction, WebhookClient, EmbedBuilder } = require('discord.js');
const {logerHookUrl} = require('../config.json')
    module.exports = {
        name: 'interactionCreate',
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
        execute(interaction) {
            const Loger = new WebhookClient({url: logerHookUrl })

            const Response = new EmbedBuilder()
                .setColor('DarkAqua')
                .setTitle(`${interaction.user.tag} a executé une commande`)
                .setDescription(`Salon: ${interaction.channel} \n Commande: /${interaction.commandName}`)
                .setThumbnail(interaction.user.avatarURL({dynamic: true}))
            
            Loger.send({
                embeds: [Response]
            })
            
        },
};