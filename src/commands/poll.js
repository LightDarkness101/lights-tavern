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
        .setName('poll')
        .setDescription('Manages the commands for the poll command.')
        .addSubcommand((subcommand) =>
            subcommand
            .setName('create')
            .setDescription('Create a new poll.')
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('delete')
            .setDescription('Force stop and delete the poll.')
            .addStringOption((option) =>
                option
                .setName('messageid')
                .setDescription('The ID of the poll message.')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('end')
            .setDescription('Force end the poll.')
            .addStringOption((option) =>
                option
                .setName('messageid')
                .setDescription('The ID of the poll message.')
                .setRequired(true)
            )
        ),
    async execute(interaction, db) {

        await db.collection('guilds').doc(interaction.guild.id).collection("storage").doc("ids").get().then((doc) => {
            light = interaction.guild.roles.cache.find(x => x.id === doc.data().light);
            mod = interaction.guild.roles.cache.find(x => x.id === doc.data().mod);
            pollsChannelID = doc.data().pollsChannelID;
            pollsMessageID = doc.data().pollsMessageID;
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

                const pollChannel = new TextInputBuilder()
                    .setCustomId(`poll-channel`)
                    .setLabel(`Channel for the poll?`)
                    .setRequired(true)
                    .setPlaceholder(`Channel ID (Right click channel, copy channel ID)`)
                    .setStyle(TextInputStyle.Short)

                const pollTitle = new TextInputBuilder()
                    .setCustomId(`poll-question-title`)
                    .setLabel(`What is the poll title?`)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)

                const descText = new TextInputBuilder()
                    .setCustomId(`poll-question-desc`)
                    .setLabel(`Description of the poll?`)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Paragraph)

                const questionsText = new TextInputBuilder()
                    .setCustomId(`poll-question-count`)
                    .setLabel(`How many answers can be given?`)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Paragraph)

                const createModal = new ModalBuilder()
                    .setCustomId('poll-create')
                    .setTitle('Create a Giveaway!')
                    .addComponents(
                        new ActionRowBuilder()
                        .addComponents(pollChannel),
                        new ActionRowBuilder()
                        .addComponents(pollTitle),
                        new ActionRowBuilder()
                        .addComponents(descText),
                        new ActionRowBuilder()
                        .addComponents(questionsText),
                    );

                await interaction.showModal(createModal);

            } else if (interaction.options.getSubcommand() === 'delete') {

                const targetPoll = interaction.options.getString('messageid');

                await db.collection('guilds').doc(interaction.guild.id).get().then((doc) => {
                    pollList = doc.data().polls;
                });

                if (!pollList.includes(targetPoll)) {
                    let embed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setDescription('That poll message ID does not exist, or is not logged in the database.')

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    });
                } else {
                    await db.collection('guilds').doc(interaction.guild.id).collection('polls').doc(targetPoll).get().then((doc) => {
                        pollChannel = doc.data().pollChannel;
                        answers = doc.data().answers;
                        title = doc.data().title;
                    });

                    /*if (pollChannel && targetPoll) {
                        let oldChannel = interaction.guild.channels.cache.get(pollChannel);
                        oldChannel.messages.fetch(targetPoll).then(d => d.delete());
                    }*/
                    const getMax = object => {
                        let max = Math.max(...Object.values(object));
                        return Object.keys(object).filter(key => object[key] == max);
                    }

                    let topAnswer = Object.entries(answers).reduce((max, entry) => entry[1] >= max[1] ? entry : max, [0, -Infinity]);

                    let topAnswerArr = getMax(answers);



                    console.log(topAnswerArr.length);

                    if (topAnswerArr.length > 1) {

                        let topWinners = "";

                        for (let i = 0; i < topAnswerArr.length; i++) {
                            if (i === 0) topWinners = `**${topAnswerArr[0]}**`;
                            if (i > 0) topWinners = topWinners + ` and **${topAnswerArr[i]}**`;
                        }

                        // Creating the log embed.
                        let logEmbed = new EmbedBuilder()
                            .setTitle(`Poll Deleted!`)
                            .setColor("Random")
                            .setDescription(`A poll with a tie was deleted, here are the results:`)
                            .addFields({
                                name: 'Title:',
                                value: title
                            }, {
                                name: `Winner:`,
                                value: `${topWinners} each at **${topAnswer[1]}** selections!`
                            })
                            .setTimestamp()

                        //await db.collection('guilds').doc(interaction.guild.id).collection('polls').doc(targetPoll).delete();

                        interaction.reply({
                            content: `That poll has been deleted!`,
                            ephemeral: true
                        });

                        log.send({
                            embeds: [logEmbed]
                        });
                    } else {
                        // Creating the log embed.
                        let logEmbed = new EmbedBuilder()
                            .setTitle(`Poll Deleted!`)
                            .setColor("Random")
                            .setDescription(`A poll was deleted, here are the results:`)
                            .addFields({
                                name: 'Title:',
                                value: title
                            }, {
                                name: `Winner:`,
                                value: `**${topAnswer[0]}** at **${topAnswer[1]}** selections!`
                            })
                            .setTimestamp()

                        //await db.collection('guilds').doc(interaction.guild.id).collection('polls').doc(targetPoll).delete();

                        interaction.reply({
                            content: `That poll has been deleted!`,
                            ephemeral: true
                        });

                        log.send({
                            embeds: [logEmbed]
                        });
                    }
                }
            } else if (interaction.options.getSubcommand() === 'end') {

                const targetPoll = interaction.options.getString('messageid');

                await db.collection('guilds').doc(interaction.guild.id).get().then((doc) => {
                    pollList = doc.data().polls;
                });

                if (!pollList.includes(targetPoll)) {
                    let embed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setDescription('That poll message ID does not exist, or is not logged in the database.')

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    });
                } else {
                    await db.collection('guilds').doc(interaction.guild.id).collection('polls').doc(targetPoll).get().then((doc) => {
                        pollChannel = doc.data().pollChannel;
                        choices = doc.data().choices;
                        title = doc.data
                    });
                }
            }

        }
    },
}