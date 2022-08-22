const { SlashCommandBuilder, PermissionFlagsBits, WebhookClient, CommandInteraction, EmbedBuilder, Client } = require("discord.js");
const {logerHookUrl} = require('../config.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDescription("Banni un membre indéfiniment")
    .addUserOption(option => option.setName('member').setDescription('Sélectionne le membre à bannir.').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Défini une raison au bannissement').setRequired(true)),

        /**
         * 
         * @param {CommandInteraction} interaction
         * @param {Client} client
         */
    async execute(interaction, client) {
        // Logs Part
        const Loger = new WebhookClient({url: logerHookUrl });
        const Logs = new EmbedBuilder().setColor('Aqua').setTimestamp();
        
        // Include an options
        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason');

        // Init Embed of Bans
        const banEmbed = new EmbedBuilder().setColor('Red').setTimestamp();
        
        // Block ban an owner of server
        if(member.id === interaction.guild.ownerId)
        return interaction.reply({embeds: [new EmbedBuilder().setColor('Red').setDescription(`🔴 Tu ne peux pas bannir ce membre.`)], ephemeral: true});
        // Block Auto-ban
        if(interaction.user.id === member.id)
        return interaction.reply({embeds: [new EmbedBuilder().setColor('Red').setDescription(`🔴 Tu ne peux pas te bannir toi-même.`)], ephemeral: true});

        banEmbed.setDescription(`**${member} vient d'être banni du serveur !** \nRaison : ${reason}`);
        
        Logs.setDescription(`**${member} vient d'être banni du serveur !** par ${interaction.user} \n Raison: ${reason} \n Commandes utilisé dans le salon: ${interaction.channel}`);
        Loger.send({embeds: [Logs]})
        interaction.reply({embeds: [banEmbed]})
        await member.ban({reason: reason});
    }
}