
    module.exports = {
        name: 'interactionCreate',
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
        async execute(interaction) {
            console.log(`${interaction.user} use ${interaction.commandName}`)
        },
};