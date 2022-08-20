const { SlashCommandBuilder, PermissionFlagsBits, WebhookClient, CommandInteraction, EmbedBuilder } = require("discord.js");
const {logerHookUrl} = require('../config.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('unmute')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDescription("Rend la parole à l'utilisateur.")
    .addUserOption(option => option.setName('member').setDescription('Sélectionne le membre').setRequired(true)),

        /**
         * 
         * @param {CommandInteraction} interaction
         */
    async execute(interaction) {
        const Loger = new WebhookClient({url: logerHookUrl });

        const Logs = new EmbedBuilder().setColor('Aqua').setTimestamp();

        const member = interaction.options.getMember('member');

        if(!member.roles.cache.has('1009791332241379328')){
            interaction.reply({embeds: [new EmbedBuilder().setColor('Red').setDescription(`🔴 ${member} n'est pas muet`)], ephemeral: true, })
        } else {
            member.roles.remove('1009791332241379328')
            await interaction.reply({embeds: [new EmbedBuilder().setColor('Green').setDescription(`🟢 ${member} peut de nouveau communiquer`)]})
            // Logs
            Logs.setDescription(`${interaction.user} a rendu la parole à ${member}. \n Commandes utilisé dans ${interaction.channel}.`)
            Loger.send({embeds: [Logs]})
        }
        // Sending Logs
        
    }
}