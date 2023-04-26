const { Events, InteractionType } = require('discord.js');
const giveawayModal = require('./modals/giveawayModal.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(bot, db, interaction) {
        //Check that it is a modal that is being submitted.
        if (!interaction.guild || !interaction.channel || !InteractionType.ModalSubmit) {
            return;
        }
        switch (interaction.customId) {
            case 'giveaway-create': {
                giveawayModal.execute(interaction, db);
                break;
            }
        }
    },
};
