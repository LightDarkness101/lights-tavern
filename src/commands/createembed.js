const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const emojis = require(`../config/emojis.json`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createembed')
        .setDescription('Creates and manages the major embeds.')
        .addSubcommand((subcommand) =>
            subcommand
            .setName('roles')
            .setDescription('Create the group of Roles embeds.')
            .addChannelOption((option) =>
                option
                .setName('channel')
                .setDescription('The channel the roles embeds will be sent too.')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('giveaways')
            .setDescription('Create the Giveaways embed.')
            .addChannelOption((option) =>
                option
                .setName('channel')
                .setDescription('The channel the giveaways embed will be sent too.')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('polls')
            .setDescription('Create the Polls embed.')
            .addChannelOption((option) =>
                option
                .setName('channel')
                .setDescription('The channel the polls embed will be sent too.')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('promotion')
            .setDescription('Create the Promotions embed.')
            .addChannelOption((option) =>
                option
                .setName('channel')
                .setDescription('The channel the promotions embed will be sent too.')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('rules')
            .setDescription('Create the Rules embed.')
            .addChannelOption((option) =>
                option
                .setName('channel')
                .setDescription('The channel the rules embed will be sent too.')
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName('information')
            .setDescription('Create the group of Information embeds.')
            .addChannelOption((option) =>
                option
                .setName('channel')
                .setDescription('The channel the information embeds will be sent too.')
                .setRequired(true)
            )
        ),
    async execute(interaction, db) {

        await db.collection('guilds').doc(interaction.guild.id).collection("storage").doc("ids").get().then((doc) => {
            light = interaction.guild.roles.cache.find(x => x.id === doc.data().light);
            giveawaysChannelID = doc.data().giveawaysChannelID;
            giveawaysMessageID = doc.data().giveawaysMessageID;
            pollsChannelID = doc.data().pollsChannelID;
            pollsMessageID = doc.data().pollsMessageID;
            rolesChannelID = doc.data().rolesChannelID;
            rolesOneMessageID = doc.data().rolesOneMessageID;
            rolesTwoMessageID = doc.data().rolesTwoMessageID;
            rolesThreeMessageID = doc.data().rolesThreeMessageID;
            rulesChannelID = doc.data().rulesChannelID;
            rulesMessageID = doc.data().rulesMessageID;
            promotionChannelID = doc.data().promotionChannelID;
            promotionMessageID = doc.data().promotionMessageID;
            informationChannelID = doc.data().informationChannelID;
            informationMessageID = doc.data().informationMessageID;
        });

        let channel = interaction.channel;
        let log = channel.guild.channels.cache.get('1099908513020522516');

        // If user does not have the role `Light`, then deny useability.
        if (!interaction.member.roles.cache.has(light.id)) {
            let embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('You do not have permission to use this command.')

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } else {

            // Check which embed is being generated.
            if (interaction.options.getSubcommand() === 'rules') {

                const targetChannel = interaction.options.getChannel('channel');

                // If bot does not have these permissions, cancel.
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("ViewChannel")) return interaction.reply({
                    content: "I don't have permission to view that channel.",
                    ephemeral: true
                });
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("SendMessages")) return interaction.reply({
                    content: "I don't have permission to send messages in that channel.",
                    ephemeral: true
                });

                // Creating the official rules embed.
                const rulesEmbed = new EmbedBuilder()
                    .setTitle(`Light's Tavern Rules`)
                    .setColor('Random')
                    .setDescription(`Rules are extremely important! They help keep the flow of this Discord server calm, collected, and drunk. It also allows everyone to have a great time! Please make sure to follow all the rules listed, have general common sense, and you should have a wonderful time!\n\n**First and foremost, you must follow Discord's community Guidelines/General Rules.**\n\nWithout further ado, here are the Tavern's Rules:`)
                    .addFields({
                        name: `Advertising / Promoting`,
                        value: `Do not join this server solely to promote your own content. If you truly wish to get more eyes on your channel, interact with the community, and make sure to reach out a mod or LightDarkness regarding having your channel being posted in #promotions-of-others.`
                    }, {
                        name: `No NSFW Content`,
                        value: `Absolutely any content / images / messages that qualify as NSFW (Not Safe For Work) is not allowed under any circumstances. Breaking this rule can get you instantly perm muted or banned.`
                    }, {
                        name: `Not Tinder`,
                        value: `This Tavern is not your tinder / bumble app. You should not be here looking for your one true love. If you are, you need to re-evaluate your life choices, or get therapy. Do not bother people in general or in dms trying to date / get with them.`
                    }, {
                        name: `Language: English`,
                        value: `The primary language of this Tavern is English. If you must speak a different language, either translate it first, or take it to DMs with the other person who speaks that language. Keep it solely English in any public channels.`
                    }, {
                        name: `Religion / Politics / Movements`,
                        value: `If absolutely needed, a channel / thread can be made for each respective topic, however, controversial topics such as the three listed above or any others are not allowed in any public channels not designated for those topics. (If a channel is designated for the topics, it is solely for proper talking / debating. There should be no arguing or anger in these channels, take it to DMs if you are that passionate about it.`
                    }, {
                        name: `Pinging / Tagging`,
                        value: `Do not ping / tag any of the Taverns roles or users without proper reasoning. If something serious is going down, tag the @Moderator role once, then wait. If really needed, DM a mod or LightDarkness.`
                    }, {
                        name: `Spoilers / Game Gossip`,
                        value: `Make sure to not spoil any ending to any game / movie / tv show / anime on public channels within Light's Tavern. If someone really wants to know a spoiler, take it to DMs.`
                    }, {
                        name: `Recording Without Consent`,
                        value: `Absolutely no recording the public voice channels without proper consent from everyone actively in the voice channel. (This does not count towards those who are streaming already when someone else joins the call.) Properly ask everyone in the call, then with permission, you may record it.`
                    }, {
                        name: `Malicious Files / Harmful Links`,
                        value: `Keep any and all malicious files and harmful links to yourself. If you really must bother someone with those, take it to another discord, or talk to the official Discord staff, they would love to see what you have to show them. If it jeopardizes the safety and security of others, it is not allowed.`
                    }, )
                    .setFooter({
                        text: `Thank you for coming to my TED Talk, and thank you in advance for following all of the rules!`
                    })

                // Sending the message, and saving it as a variable to upload to database.
                let a = await targetChannel.send({
                    embeds: [rulesEmbed]
                });
                interaction.reply({
                    content: `Rules embed sent!`,
                    ephemeral: true
                });

                // Creating the log embed.
                let logEmbed = new EmbedBuilder()
                    .setTitle(`Rules Embed Moved/Edited`)
                    .setColor("Random")
                    .setDescription(`The embed was moved/edited in ${targetChannel} by ${interaction.member}`)
                    .setTimestamp()

                // Deleting the old rules embed, and saving the new rules embed message to the database, and logging the action.
                if (rulesChannelID && rulesMessageID) {
                    let oldChannel = interaction.guild.channels.cache.get(rulesChannelID);
                    oldChannel.messages.fetch(rulesMessageID).then(d => d.delete());
                }
                db.collection('guilds').doc(channel.guild.id).collection('storage').doc('ids').update({
                    'rulesMessageID': a.id,
                    'rulesChannelID': targetChannel.id
                });
                log.send({
                    embeds: [logEmbed]
                });

            } else if (interaction.options.getSubcommand() === 'roles') {

                const targetChannel = interaction.options.getChannel('channel');

                // If bot does not have these permissions, cancel.
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("ViewChannel")) return interaction.reply({
                    content: "I don't have permission to view that channel.",
                    ephemeral: true
                });
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("SendMessages")) return interaction.reply({
                    content: "I don't have permission to send messages in that channel.",
                    ephemeral: true
                });

                // Creating the official information 1 embed.
                const roleWorking = new EmbedBuilder()
                    .setTitle(`How Roles Work`)
                    .setColor('Random')
                    .setDescription(`Below will be a couple of embeds with buttons below them. Each embed will explain the roles in that category, with a specific button for each role. If you want one of the roles, you simply need to click the button that reads the role you want. If you later decide you no longer want that role, just re-click the button, and it will remove the role from you.`)

                const notificationRoles = new EmbedBuilder()
                    .setTitle(`Notification Roles`)
                    .setColor('Random')
                    .setDescription(`These roles are for official Tavern things, such as getting streaming notifications for other streamers, knowing when a giveaway is running, or being told when we want your opinion on a poll. Here are some quick descriptions for each role in this category:`)
                    .addFields({
                        name: `Giveaways`,
                        value: `This role will notify you when a giveaway is running. Make sure you are following LightDankness, otherwise you can't enter.`
                    }, {
                        name: `Polls`,
                        value: `This role will notify you when a new poll is ran, so that you can give us your opinion on said topic.`
                    }, {
                        name: `Notifications`,
                        value: `This role will tell you when any streamers, other than myself, are streaming.`
                    })

                const gamingRoles = new EmbedBuilder()
                    .setTitle(`Gaming Roles`)
                    .setColor('Random')
                    .setDescription(`These roles are for people who want to state their favorite games / games they play in their role list. When you have one of these roles, someone can find you easier when looking for someone to talk about when talking about a specific game. This will also grant you the ability to participate in any events relating to that game. Here are some quick descriptions for each role in this category:`)
                    .addFields({
                        name: `Dead By Daylight`,
                        value: `This role will give you the ability to possibly play in a SWF with me when I am streaming or just playing in general. This also lets others who want to SWF know who to ask to play.`
                    }, {
                        name: `D&D`,
                        value: `This role will grant you access to all the D&D channels, and let you possibly play or run your own campaigns here in this very discord. It also will give you the chance to be able to play in one of my own campaigns at some point.`
                    }, {
                        name: `PlateUp!`,
                        value: `This role will let you have the high probability that when I go to play PlateUp! I will reach out to you seeing if you want to play, or participate in my stream.`
                    }, {
                        name: `More to Come`,
                        value: `At the moment, those are the three main games I can see being played, however, it is definitely not a finished list!`
                    })

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId(`giveaways`)
                        .setEmoji(`🎉`)
                        .setLabel(`Giveaways`)
                        .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                        .setCustomId(`polls`)
                        .setEmoji(`📊`)
                        .setLabel(`Polls`)
                        .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                        .setCustomId(`notifications`)
                        .setEmoji(`🔔`)
                        .setLabel(`Notifications`)
                        .setStyle(ButtonStyle.Danger), //🍽️
                    )

                const rowTwo = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId(`dbd`)
                        .setEmoji(emojis.dbd)
                        .setLabel(`Dead By Daylight`)
                        .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                        .setCustomId(`dnd`)
                        .setEmoji(emojis.dnd)
                        .setLabel(`D&D`)
                        .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                        .setCustomId(`plateup`)
                        .setEmoji(`🍽️`)
                        .setLabel(`PlateUp!`)
                        .setStyle(ButtonStyle.Danger), //🍽️
                    )

                // Sending the message, and saving it as a variable to upload to database.
                let oneMessage = await targetChannel.send({
                    embeds: [roleWorking]
                });
                let twoMessage = await targetChannel.send({
                    embeds: [notificationRoles],
                    components: [row]
                });
                let threeMessage = await targetChannel.send({
                    embeds: [gamingRoles],
                    components: [rowTwo]
                });
                interaction.reply({
                    content: `Roles embed sent!`,
                    ephemeral: true
                });

                // Creating the log embed.
                let logEmbed = new EmbedBuilder()
                    .setTitle(`Roles Embed Moved/Edited`)
                    .setColor("Random")
                    .setDescription(`The embed was moved/edited in ${targetChannel} by ${interaction.member}`)
                    .setTimestamp()

                // Deleting the old Roles embeds, and saving the new Roles embed messages to the database, and logging the action.
                if (rolesChannelID && rolesOneMessageID && rolesTwoMessageID && rolesThreeMessageID) {
                    let oldChannel = interaction.guild.channels.cache.get(rolesChannelID);
                    oldChannel.messages.fetch(rolesOneMessageID).then(d => d.delete());
                    oldChannel.messages.fetch(rolesTwoMessageID).then(d => d.delete());
                    oldChannel.messages.fetch(rolesThreeMessageID).then(d => d.delete());
                }
                db.collection('guilds').doc(channel.guild.id).collection('storage').doc('ids').update({
                    'rolesOneMessageID': oneMessage.id,
                    'rolesTwoMessageID': twoMessage.id,
                    'rolesThreeMessageID': threeMessage.id,
                    'rolesChannelID': targetChannel.id
                });
                log.send({
                    embeds: [logEmbed]
                });

            } else if (interaction.options.getSubcommand() === 'polls') {

                const targetChannel = interaction.options.getChannel('channel');

                // If bot does not have these permissions, cancel.
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("ViewChannel")) return interaction.reply({
                    content: "I don't have permission to view that channel.",
                    ephemeral: true
                });
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("SendMessages")) return interaction.reply({
                    content: "I don't have permission to send messages in that channel.",
                    ephemeral: true
                });

                // Creating the official polls embed.
                const pollsEmbed = new EmbedBuilder()
                    .setTitle(`Light's Tavern Polls Info`)
                    .setColor('Random')
                    .setDescription(`Drunk people love taking polls. They love giving their opinion. Don't find shame in it, it is great and useful for the community! Here in the Polls channel, we will have regular polls posted (each with its own thread to talk further) to get the community opinion on random things. These could also be your chance to change something about Light's Tavern or LightDankess Twitch Channel.`)
                    .addFields({
                        name: `Requirements`,
                        value: `Light's Tavern has no requirements for local polls. We want any and all opinions, so we can become the best there is!`
                    }, )

                // Sending the message, and saving it as a variable to upload to database.
                let a = await targetChannel.send({
                    embeds: [pollsEmbed]
                });
                interaction.reply({
                    content: `Polls embed sent!`,
                    ephemeral: true
                });

                // Creating the log embed.
                let logEmbed = new EmbedBuilder()
                    .setTitle(`Polls Embed Moved/Edited`)
                    .setColor("Random")
                    .setDescription(`The embed was moved/edited in ${targetChannel} by ${interaction.member}`)
                    .setTimestamp()

                // Deleting the old polls embed, and saving the new polls embed message to the database, and logging the action.
                if (pollsChannelID && pollsMessageID) {
                    let oldChannel = interaction.guild.channels.cache.get(pollsChannelID);
                    oldChannel.messages.fetch(pollsMessageID).then(d => d.delete());
                }
                db.collection('guilds').doc(channel.guild.id).collection('storage').doc('ids').update({
                    'pollsMessageID': a.id,
                    'pollsChannelID': targetChannel.id
                });
                log.send({
                    embeds: [logEmbed]
                });

            } else if (interaction.options.getSubcommand() === 'giveaways') {

                const targetChannel = interaction.options.getChannel('channel');

                // If bot does not have these permissions, cancel.
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("ViewChannel")) return interaction.reply({
                    content: "I don't have permission to view that channel.",
                    ephemeral: true
                });
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("SendMessages")) return interaction.reply({
                    content: "I don't have permission to send messages in that channel.",
                    ephemeral: true
                });

                // Creating the official giveaways embed.
                const giveawaysEmbed = new EmbedBuilder()
                    .setTitle(`Light's Tavern Giveaways Info`)
                    .setColor('Random')
                    .setDescription(`Giveaways will be held at every milestone that I have listed in the <#1099418718401990737> channel. When a giveaway is completed, the winner of said giveaway will have 48 hours to claim their prize, or the giveaway will be rerolled.`)
                    .addFields({
                        name: `Requirements`,
                        value: `Unless otherwise stated, every giveaway will require you to follow LightDankness on Twitch.\nhttps://twitch.tv/lightdankness`
                    }, {
                        name: `Subscribers`,
                        value: `(Only applicable when affiliate is achieved.) There will be very few giveaways that will require you to have a sub to LightDankness on Twitch. These will be to reward those who chose to subscribe by giving back to the community!`
                    })

                // Sending the message, and saving it as a variable to upload to database.
                let a = await targetChannel.send({
                    embeds: [giveawaysEmbed]
                });
                interaction.reply({
                    content: `Giveaways embed sent!`,
                    ephemeral: true
                });

                // Creating the log embed.
                let logEmbed = new EmbedBuilder()
                    .setTitle(`Giveaways Embed Moved/Edited`)
                    .setColor("Random")
                    .setDescription(`The embed was moved/edited in ${targetChannel} by ${interaction.member}`)
                    .setTimestamp()

                // Deleting the old giveaways embed, and saving the new giveaways embed message to the database, and logging the action.
                if (giveawaysChannelID && giveawaysMessageID) {
                    let oldChannel = interaction.guild.channels.cache.get(giveawaysChannelID);
                    oldChannel.messages.fetch(giveawaysMessageID).then(d => d.delete());
                }
                db.collection('guilds').doc(channel.guild.id).collection('storage').doc('ids').update({
                    'giveawaysMessageID': a.id,
                    'giveawaysChannelID': targetChannel.id
                });
                log.send({
                    embeds: [logEmbed]
                });

            } else if (interaction.options.getSubcommand() === 'information') {

                const targetChannel = interaction.options.getChannel('channel');

                // If bot does not have these permissions, cancel.
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("ViewChannel")) return interaction.reply({
                    content: "I don't have permission to view that channel.",
                    ephemeral: true
                });
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("SendMessages")) return interaction.reply({
                    content: "I don't have permission to send messages in that channel.",
                    ephemeral: true
                });

                // Creating the official information 1 embed.
                const oneEmbed = new EmbedBuilder()
                    .setTitle(`New Videos`)
                    .setColor('Random')
                    .setDescription(`Hopefully the main reason you joined Light's Tavern, you support LightDankness and his Twitch / YouTube account, If this is the case, you will want to click the New Videos button below and keep an eye on that channel, or follow the channel to have it post updates in your own discords as well!`)

                const twoEmbed = new EmbedBuilder()
                    .setTitle(`Roles`)
                    .setColor('Random')
                    .setDescription(`Role can determine just about anything you do in this Tavern. If you want to play some D&D, you will need a role. If you want to use the music bot, you will need a role. We also use roles for other reasons, just to state your generation, your gender, and so on. Click the roles button below to read more about roles, and what roles you can select!`)

                const threeEmbed = new EmbedBuilder()
                    .setTitle(`Giveaways`)
                    .setColor('Random')
                    .setDescription(`Giveaways are just about most peoples favorite here in the Tavern, because you can win prizes/items all at the free cost of following LightDankness! Listed at the bottom of this channel, you will see all of the milestones for Light's Tavern and twitch channel, and what each giveaway/prize will be when reached. Certain milestones might be subscriber only, as they might be based around subscribers, but those are far and few. Click the Giveaways button below to check out the channel and any active giveaways!`)

                const fourEmbed = new EmbedBuilder()
                    .setTitle(`Polls`)
                    .setColor('Random')
                    .setDescription(`Clicking the Polls button below will slide you over into our Polls channel. As you can guess, we will take polls every now and then to see what all of you would like from this channel and Discord. We will only ever tag the @Polls role, so that no average user who doesn't care isn't pinged. Go ahead and click below to see any active polls!`)

                const fiveEmbed = new EmbedBuilder()
                    .setTitle(`Advertisement / Promotion`)
                    .setColor('Random')
                    .setDescription(`Everyone loves advertising or promoting their own stuff, I mean can you blame them? Well, here in Light's Tavern, we aim to not only help ourselves, but help others who stream / record. Hell, even if you just post on Tiktok or instagram, you could advertise yourself there. There are a few requirements, so head on over to the Promotions channel by clicking the button below and check them out!`)

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/947381639137333288`)
                        .setLabel(`New Videos`)
                        .setStyle(ButtonStyle.Link),
                        new ButtonBuilder()
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${rolesChannelID}`)
                        .setLabel(`Roles`)
                        .setStyle(ButtonStyle.Link),
                        new ButtonBuilder()
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${giveawaysChannelID}`)
                        .setLabel(`Giveaways`)
                        .setStyle(ButtonStyle.Link),
                        new ButtonBuilder()
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${pollsChannelID}`)
                        .setLabel(`Polls`)
                        .setStyle(ButtonStyle.Link),
                        new ButtonBuilder()
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${promotionChannelID}`)
                        .setLabel(`Advertisements / Promotions`)
                        .setStyle(ButtonStyle.Link)
                    )

                // Sending the message, and saving it as a variable to upload to database.
                let a = await targetChannel.send({
                    files: [`https://i.imgur.com/Gdst4PD.jpg`],
                    embeds: [oneEmbed, twoEmbed, threeEmbed, fourEmbed, fiveEmbed],
                    components: [row]
                });
                interaction.reply({
                    content: `Information embed sent!`,
                    ephemeral: true
                });

                // Creating the log embed.
                let logEmbed = new EmbedBuilder()
                    .setTitle(`Information Embed Moved/Edited`)
                    .setColor("Random")
                    .setDescription(`The embed was moved/edited in ${targetChannel} by ${interaction.member}`)
                    .setTimestamp()

                // Deleting the old Information embed, and saving the new Information embed message to the database, and logging the action.
                if (informationChannelID && informationMessageID) {
                    let oldChannel = interaction.guild.channels.cache.get(informationChannelID);
                    oldChannel.messages.fetch(informationMessageID).then(d => d.delete());
                }
                db.collection('guilds').doc(channel.guild.id).collection('storage').doc('ids').update({
                    'informationMessageID': a.id,
                    'informationChannelID': targetChannel.id
                });
                log.send({
                    embeds: [logEmbed]
                });

            } else if (interaction.options.getSubcommand() === 'promotion') {

                const targetChannel = interaction.options.getChannel('channel');

                // If bot does not have these permissions, cancel.
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("ViewChannel")) return interaction.reply({
                    content: "I don't have permission to view that channel.",
                    ephemeral: true
                });
                if (!targetChannel.permissionsFor(interaction.guild.members.me).has("SendMessages")) return interaction.reply({
                    content: "I don't have permission to send messages in that channel.",
                    ephemeral: true
                });

                // Creating the official promotions embed.
                const promoEmbed = new EmbedBuilder()
                    .setTitle(`Light's Tavern Promotion Info`)
                    .setColor('Random')
                    .setDescription(`In this channel, YOU could possibly have your twitch/youtube notifications uploaded here. Anytime you go live or post a video, it could post in this channel, tagging everyone with the Notifications role, advertising your channel to them! Just DM LightDarkness, or any moderators to find out more!`)
                    .addFields({
                        name: `Requirements`,
                        value: `To be promoted here, you must be following LightDankness on Twitch!\n\nHere in the Tavern, we would hate to send our drunks somewhere that isn't consistent. If you aren't putting out enough content for drunkards to enjoy, then why would we send our happy friends to your channel?\n\nLight's Tavern just requires one (1) stream or video uploaded, per week. That isn't too much to ask if you want to advertise yourself.`
                    }, )

                // Sending the message, and saving it as a variable to upload to database.
                let a = await targetChannel.send({
                    embeds: [promoEmbed]
                });
                interaction.reply({
                    content: `Promotions embed sent!`,
                    ephemeral: true
                });

                // Creating the log embed.
                let logEmbed = new EmbedBuilder()
                    .setTitle(`Promotions Embed Moved/Edited`)
                    .setColor("Random")
                    .setDescription(`The embed was moved/edited in ${targetChannel} by ${interaction.member}`)
                    .setTimestamp()

                // Deleting the old promotions embed, and saving the new promotions embed message to the database, and logging the action.
                if (promotionChannelID && promotionMessageID) {
                    let oldChannel = interaction.guild.channels.cache.get(promotionChannelID);
                    oldChannel.messages.fetch(promotionMessageID).then(d => d.delete());
                }
                db.collection('guilds').doc(channel.guild.id).collection('storage').doc('ids').update({
                    'promotionMessageID': a.id,
                    'promotionChannelID': targetChannel.id
                });
                log.send({
                    embeds: [logEmbed]
                });

            }

        }

    },
}