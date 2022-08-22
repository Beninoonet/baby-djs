const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName('mp')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Teste les MPS")
    .addUserOption(option => option.setName('member').setDescription('Sélectionneun membre').setRequired(true)),

        /**
         * 
         * @param {CommandInteraction} interaction
         */
    async execute(interaction) {
        const member = interaction.options.getMember('member');

        const msgEmbed = new EmbedBuilder().setDescription('Coucou').setColor('Aqua')

        member.createDM().then(mp => mp.send({embeds: [msgEmbed]}))

        
    }
}