const { CommandInteraction, WebhookClient, EmbedBuilder } = require('discord.js');
const {logerHookUrl} = require('../config.json')
    module.exports = {
        name: 'interactionCreate',
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
        execute(interaction) {
            console.log(`${interaction.user.tag} a utilisé ${interaction.commandName} dans le salon ${interaction.channel}`)
        },
};