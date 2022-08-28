const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');


module.exports = {
    data: new ContextMenuCommandBuilder()
	.setName('user-info')
	.setType(ApplicationCommandType.User),
    
    async execute(interaction) {
        await interaction.reply({
            content: `coucou ${interaction.targetUser}`
        })
    }

}