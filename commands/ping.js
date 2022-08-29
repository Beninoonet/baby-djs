const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription('Respond with Pong'),
    async execute(interaction) {
        await interaction.reply(`**Latence API** \`\`\`${interaction.client.ws.ping}ms\`\`\``);
    }
}