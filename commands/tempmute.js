const { SlashCommandBuilder, PermissionFlagsBits, WebhookClient, CommandInteraction, EmbedBuilder } = require("discord.js");
const {logerHookUrl} = require('../config.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('tempmute')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDescription("Rend muet l'utilisateur mentionné avec un temps défini.")
    .addUserOption(option => option.setName('member').setDescription('Sélectionne le membre à rendre muet').setRequired(true))
    .addIntegerOption(option => option.setName('time').setDescription('Défini la durée du mute. (en milliseconde)').setRequired(true)),

        /**
         * 
         * @param {CommandInteraction} interaction
         */
    async execute(interaction) {
        const Loger = new WebhookClient({url: logerHookUrl });

        const Logs = new EmbedBuilder().setColor('Aqua').setTimestamp();

        const member = interaction.options.getMember('member');
        const time = interaction.options.getInteger('time')

        if(!interaction.guild.roles.cache.has('1009791332241379328')){
            interaction.reply({embeds: [new EmbedBuilder().setColor('Red').setDescription(`🔴 Le rôle **Muet** n'existe pas`)], ephemeral: true})
        }

        if(member.roles.cache.has('1009791332241379328')){
            interaction.reply({embeds: [new EmbedBuilder().setColor('Orange').setDescription(`🟠 ${member} est déjà muet`)], ephemeral: true, })
        } else {
            member.roles.add('1009791332241379328')
            await interaction.reply({embeds: [new EmbedBuilder().setColor('Green').setDescription(`🟢 ${member} est désormais muet durant ${time}ms`)]})
            setTimeout(() => member.roles.remove('1009791332241379328'), time)
            // Logs
            Logs.setDescription(`${interaction.user} a rendu muet ${member} durant ${time}ms. \n Commandes utilisé dans ${interaction.channel}.`)
            Loger.send({embeds: [Logs]})
        }
        
    }
}