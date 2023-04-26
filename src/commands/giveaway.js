const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require("discord.js");
const emojis = require(`../config/emojis.json`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Manages the commands for the giveaway command.')
        .addSubcommand((subcommand) =>
            subcommand
            .setName('create')
            .setDescription('Create a new giveaway.')
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('delete')
            .setDescription('Force stop and delete the giveaway.')
            .addStringOption((option) =>
                option
                .setName('messageid')
                .setDescription('The ID of the giveaway message.')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('end')
            .setDescription('Force end the giveaway.')
            .addStringOption((option) =>
                option
                .setName('messageid')
                .setDescription('The ID of the giveaway message.')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('reroll')
            .setDescription('Reroll the listed giveaway.')
            .addStringOption((option) =>
                option
                .setName('messageid')
                .setDescription('The ID of the giveaway message.')
                .setRequired(true)
            )
        ),
    async execute(interaction, db) {

        await db.collection('guilds').doc(interaction.guild.id).collection("storage").doc("ids").get().then((doc) => {
            light = interaction.guild.roles.cache.find(x => x.id === doc.data().light);
            mod = interaction.guild.roles.cache.find(x => x.id === doc.data().mod);
            giveawaysChannelID = doc.data().giveawaysChannelID;
            giveawaysMessageID = doc.data().giveawaysMessageID;
        });

        let channel = interaction.channel;
        let log = channel.guild.channels.cache.get('1099908513020522516');

        // If user does not have the role `Light`, then deny useability.
        if (!interaction.member.roles.cache.has(light.id) && !interaction.member.roles.cache.had(mod.id)) {
            let embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('You do not have permission to use this command.')

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } else {

            if (interaction.options.getSubcommand() === 'create') {

                const durationText = new TextInputBuilder()
                    .setCustomId(`giveaway-duration`)
                    .setLabel(`Duration of the Giveaway?`)
                    .setRequired(true)
                    .setPlaceholder(`Ex: 10 Minutes (s, m, h, d, w) To do shows months, just use 4 or more weeks.`)
                    .setStyle(TextInputStyle.Short)

                const giveawayChannel = new TextInputBuilder()
                    .setCustomId(`giveaway-channel`)
                    .setLabel(`Channel for the giveaway?`)
                    .setRequired(true)
                    .setPlaceholder(`Channel ID (Right click channel, copy channel ID)`)
                    .setStyle(TextInputStyle.Short)

                const winnersText = new TextInputBuilder()
                    .setCustomId(`giveaway-winner`)
                    .setLabel('Number of Winners?')
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)

                const prizeText = new TextInputBuilder()
                    .setCustomId(`giveaway-prize`)
                    .setLabel(`What is the prize?`)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)

                const descText = new TextInputBuilder()
                    .setCustomId(`giveaway-desc`)
                    .setLabel(`Description of the prize/giveaway?`)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Paragraph)

                const createModal = new ModalBuilder()
                    .setCustomId('giveaway-create')
                    .setTitle('Create a Giveaway!')
                    .addComponents(
                        new ActionRowBuilder()
                        .addComponents(durationText),
                        new ActionRowBuilder()
                        .addComponents(giveawayChannel),
                        new ActionRowBuilder()
                        .addComponents(winnersText),
                        new ActionRowBuilder()
                        .addComponents(prizeText),
                        new ActionRowBuilder()
                        .addComponents(descText),
                    );

                await interaction.showModal(createModal);

            } else if (interaction.options.getSubcommand() === 'delete') {

            } else if (interaction.options.getSubcommand() === 'end') {

            } else if (interaction.options.getSubcommand() === 'reroll') {

            }

        }
    },
}