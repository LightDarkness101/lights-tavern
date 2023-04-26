const { Events, InteractionType } = require('discord.js');
const roleButtons = require('../events/buttons/roleButtons.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(bot, db, interaction) {

        //Check that it is a button that is being pressed
        if (!interaction.guild || !interaction.channel || !interaction.isButton()) {
            return;
        }
        
        // Determine the button category that is being pressed
        if (interaction.customId === 'giveaways' || 'polls' || 'notifications' || 'dbd' || 'dnd' || 'plateup') {
            return roleButtons.execute(interaction, db, interaction.customId);
        }
    },
};
