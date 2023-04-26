const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(bot, db) {
        console.log(`Bot ready and logged in as ${bot.user.tag}`);
    },
};