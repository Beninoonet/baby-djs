const { SlashCommandBuilder, PermissionFlagsBits, Client, CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription('Respond with Pong'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const tryPong = interaction.reply({content: "En attente de la réponse.", fetchReply: true});

        const Response = new EmbedBuilder()
        .setTitle('Pong! 🟢')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: "Latence API.", value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
            { name: "Latence Bot.", value: `\`\`\`${(await tryPong).createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true}
        )
        .setTimestamp()
        .setFooter({
            text: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL(),
        });

        interaction.editReply({embeds: [embeds]});
    }
}