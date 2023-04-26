module.exports = {
    async execute(interaction, db, ticketType) {

        // Gather data needed from Database.
        await db.collection('guilds').doc(interaction.guild.id).collection("storage").doc("ids").get().then((doc) => {
            giveaways = doc.data().giveaways;
            polls = doc.data().polls;
            notifications = doc.data().notifications;
            dbd = doc.data().dbd;
            dnd = doc.data().dnd;
            plateup = doc.data().plateup;
        });

        // Define basic variables.
        let member = interaction.member;
        let roleID =
            ticketType === 'giveaways' ? giveaways:
            ticketType === 'polls' ? polls :
            ticketType === 'notifications' ? notifications :
            ticketType === 'dbd' ? dbd :
            ticketType === 'dnd' ? dnd :
            ticketType === 'plateup' ? plateup :
            'ticket';

        if (ticketType === `giveaways` || `polls` || `notifications` || `dbd` || `dnd` || `plateup`) {
            let role = interaction.guild.roles.cache.find(x => x.id === roleID);
            if (member.roles.cache.has(roleID)) {
                member.roles.remove(role);
                interaction.reply({
                    content: `You no longer have the ${role} role.`,
                    ephemeral: true
                });
            } else if (!member.roles.cache.has(roleID)) {
                member.roles.add(role);
                interaction.reply({
                    content: `You now have the ${role} role.`,
                    ephemeral: true
                });
            }
        }
    },
};
