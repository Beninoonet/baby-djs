
    module.exports = {
        name: 'interactionCreate',
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
        async execute(interaction, client) {
            console.log(`${interaction.user} use ${interaction.commandName}`)
        },
};