const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, EmbedBuilder, WebhookClient} = require("discord.js");
const {logerHookUrl} = require('../config.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('suggest')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .setDescription('Faites une suggestions.')
    .addStringOption(option =>
        option.setName('texte')
                .setDescription('écrit ta suggestion ici.')
                .setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, msg) {
        const suggestChannel = interaction.guild.channels.cache.get('1008445644727390248')
        const suggestText = interaction.options.getString('texte');

        const Loger = new WebhookClient({url: logerHookUrl });

        const Response = new EmbedBuilder()
        .setColor("DarkGold")
        .setThumbnail(interaction.user.avatarURL({dynamic: true}))
        .setTitle(`Suggestion de ${interaction.user.tag}`)
        .setDescription(`${suggestText}`)
        .setTimestamp();
        
        

        const message = await suggestChannel.send({embeds: [Response], fetchReply: true})

        message.react("✔️")
        message.react("❌")

        interaction.reply({ content: `Ta suggestion a été publié ici -> **${suggestChannel}.**`, ephemeral: true});


        const Logs = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`${interaction.user.tag} à utilisé ${interaction.commandName}`)
            .setDescription(`Publié dans le salon ${suggestChannel} \n [Messages](${message.url})`)
            .setTimestamp();
        Loger.send({embeds: [Logs]})

    }
}