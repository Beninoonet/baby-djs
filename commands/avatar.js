const { ContextMenuCommandBuilder, ApplicationCommandType, CommandInteraction } = require('discord.js');


module.exports = {
    data: new ContextMenuCommandBuilder()
	.setName('avatar')
	.setType(ApplicationCommandType.User),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        await interaction.reply({
            content: `coucou ${interaction.targetUser.displayAvatarURL()}`
        })
    }

}