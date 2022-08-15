const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDescription("Permet d'effacer un nombre de messages défini.")
    .addIntegerOption(option => option.setName('message').setDescription('indique le nombre de messages à supprimer.').setRequired(false))
    .addUserOption(option => option.setName('target').setDescription("Supprimer les messages d'un membre spécifique.").setRequired(false)),
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
    async execute(interaction) {

        const message = interaction.options.getInteger('message');
        const target = interaction.options.getUser('target');
        const Messages = interaction.channel.messages.fetch()
        

        const Response = new EmbedBuilder()
            .setColor('DarkRed');
            
        if(message > 100){
            Response.setDescription('**Tu ne peux pas supprimé plus de 100 messages**');
            interaction.reply({embeds: [Response], ephemeral: true});
            return;
        };

        if(message < 0){
            Response.setDescription('**Tu dois supprimé au minimum 1 message**');
            interaction.reply({embeds: [Response], ephemeral: true});
            return;
        };

        if(target){
            const targetmsg = (await Messages).filter((m) => m.author.id === target.id);
            await interaction.channel.bulkDelete(targetmsg, true);
            Response.setDescription(`**Le(s) message(s) de ${target} ont été supprimé**`);

            interaction.reply({embeds: [Response], fetchReply: true})
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000);
        }
        else{
            interaction.channel.bulkDelete(message)
            Response.setDescription(`**${message} message(s) supprimé**`);

            interaction.reply({embeds: [Response], fetchReply: true})
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000);
        }

    }
}