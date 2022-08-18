const { SlashCommandBuilder, PermissionFlagsBits, WebhookClient, CommandInteraction, EmbedBuilder } = require("discord.js");
const {logerHookUrl} = require('../config.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDescription("Rend muet l'utilisateur mentionné indéfiniment.")
    .addUserOption(option => option.setName('member').setDescription('Sélectionne le membre à rendre muet')),

        /**
         * 
         * @param {CommandInteraction} interaction
         */
    async execute(interaction) {
        const Loger = new WebhookClient({url: logerHookUrl });

        const Logs = new EmbedBuilder().setColor('Aqua');

        const member = interaction.options.getMember('member');
        if(!interaction.guild.roles.cache.has('1009791332241379328')){
            interaction.reply({embeds: [new EmbedBuilder().setColor('Red').setDescription(`🔴 Le rôle **Muet** n'existe pas`)], ephemeral: true})
        }
        if(member.roles.cache.has('1009791332241379328')){
            interaction.reply({embeds: [new EmbedBuilder().setColor('Orange').setDescription(`🟠 ${member} est déjà muet`)], ephemeral: true})
        } else {
            member.roles.add('1009791332241379328')
            await interaction.reply({embeds: [new EmbedBuilder().setColor('Green').setDescription(`🟢 ${member} est désormais muet`)]})
            // Logs
            Logs.setDescription(`${interaction.user} a rendu muet ${member}. \n Commandes utilisé dans ${interaction.channel}.`)
        }
        // Sending Logs
        Loger.send({embeds: [Logs]})
    }
}