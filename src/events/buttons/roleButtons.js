const { ChannelType, Colors, EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(interaction, db, ticketType) {

        await db.collection('guilds').doc(interaction.guild.id).collection("storage").doc("ids").get().then((doc) => {
            giveaways = interaction.guild.roles.cache.find(x => x.id === doc.data().giveaways);
            polls = interaction.guild.roles.cache.find(x => x.id === doc.data().polls);
            notifications = interaction.guild.roles.cache.find(x => x.id === doc.data().notifications);
            dbd = interaction.guild.roles.cache.find(x => x.id === doc.data().dbd);
            dnd = interaction.guild.roles.cache.find(x => x.id === doc.data().dnd);
            plateup = interaction.guild.roles.cache.find(x => x.id === doc.data().plateup);
        });

        let member = interaction.member;
        let roleID =
            ticketType === 'giveaways' ? giveaways.id :
            ticketType === 'polls' ? polls.id :
            ticketType === 'notifications' ? notifications.id :
            ticketType === 'dbd' ? dbd.id :
            ticketType === 'dnd' ? dnd.id :
            ticketType === 'plateup' ? plateup.id :
            'ticket';

        switch (roleID) {
            case giveaways.id: {
                if (member.roles.cache.has(giveaways.id)) {
                    member.roles.remove(giveaways);
                    interaction.reply({
                        content: `You no longer have the ${giveaways} role.`,
                        ephemeral: true
                    });
                } else if (!member.roles.cache.has(giveaways.id)) {
                    member.roles.add(giveaways);
                    interaction.reply({
                        content: `You now have the ${giveaways} role.`,
                        ephemeral: true
                    });
                }
                break;
            }
            case polls.id: {
                if (member.roles.cache.has(polls.id)) {
                    member.roles.remove(polls);
                    interaction.reply({
                        content: `You no longer have the ${polls} role.`,
                        ephemeral: true
                    });
                } else if (!member.roles.cache.has(polls.id)) {
                    member.roles.add(polls);
                    interaction.reply({
                        content: `You now have the ${polls} role.`,
                        ephemeral: true
                    });
                }
                break;
            }
            case notifications.id: {
                if (member.roles.cache.has(notifications.id)) {
                    member.roles.remove(notifications);
                    interaction.reply({
                        content: `You no longer have the ${notifications} role.`,
                        ephemeral: true
                    });
                } else if (!member.roles.cache.has(notifications.id)) {
                    member.roles.add(notifications);
                    interaction.reply({
                        content: `You now have the ${notifications} role.`,
                        ephemeral: true
                    });
                }
                break;
            }
            case dbd.id: {
                if (member.roles.cache.has(dbd.id)) {
                    member.roles.remove(dbd);
                    interaction.reply({
                        content: `You no longer have the ${dbd} role.`,
                        ephemeral: true
                    });
                } else if (!member.roles.cache.has(dbd.id)) {
                    member.roles.add(dbd);
                    interaction.reply({
                        content: `You now have the ${dbd} role.`,
                        ephemeral: true
                    });
                }
                break;
            }
            case dnd.id: {
                if (member.roles.cache.has(dnd.id)) {
                    member.roles.remove(dnd);
                    interaction.reply({
                        content: `You no longer have the ${dnd} role.`,
                        ephemeral: true
                    });
                } else if (!member.roles.cache.has(dnd.id)) {
                    member.roles.add(dnd);
                    interaction.reply({
                        content: `You now have the ${dnd} role.`,
                        ephemeral: true
                    });
                }
                break;
            }
            case plateup.id: {
                if (member.roles.cache.has(plateup.id)) {
                    member.roles.remove(plateup);
                    interaction.reply({
                        content: `You no longer have the ${plateup} role.`,
                        ephemeral: true
                    });
                } else if (!member.roles.cache.has(plateup.id)) {
                    member.roles.add(plateup);
                    interaction.reply({
                        content: `You now have the ${plateup} role.`,
                        ephemeral: true
                    });
                }
                break;
            }
        }

    },
};