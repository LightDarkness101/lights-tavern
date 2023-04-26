const {
    ChannelType,
    Colors,
    EmbedBuilder
} = require('discord.js');
const humanize = require(`human-to-milliseconds`);
const reHumanize = require('humanize-duration');

module.exports = {
    async execute(interaction, db) {

        await db.collection('guilds').doc(interaction.guild.id).collection("storage").doc("ids").get().then((doc) => {});

        let member = interaction.member;

        // giveaway-channel giveaway-prize giveaway-winner giveaway-desc giveaway-duration

        if (!interaction.guild.channels.cache.get(interaction.fields.getTextInputValue(`giveaway-channel`))) return interaction.reply({
            content: `Unfortunately, you did not enter a proper channel id or name.`,
            ephemeral: true
        });
        if (interaction.fields.getTextInputValue(`giveaway-winner`) < 1) return interaction.reply({
            content: `Unfortunately, you did not enter a number valid for how many winners.`,
            ephemeral: true
        });
        if (interaction.fields.getTextInputValue(`giveaway-winner`) > 10) return interaction.reply({
            content: `Unfortunately, you the most winners you can have on a giveaway is 10.`,
            ephemeral: true
        });

        // Determine the duration of the giveaway
        let timeInMs = humanize(interaction.fields.getTextInputValue(`giveaway-duration`));
        let humanTime = reHumanize(timeInMs);
        console.log(humanTime);

        await interaction.reply({
            content: `So you want a giveaway for ${interaction.fields.getTextInputValue(`giveaway-winner`)} winner(s), hosted in <#${interaction.fields.getTextInputValue(`giveaway-channel`)}> who will win a ${interaction.fields.getTextInputValue(`giveaway-prize`)} in ${humanTime}.`
        });


    }
};