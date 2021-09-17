const Command = require("../structures/Command.js");

module.exports = new Command({
    name: 'kick',
    description: 'Allows to kick a user',
    permission: 'KICK_MEMBERS',
    async run(msg, args, client) {
        const member = msg.mentions.users.first();
        if (member) {
            const memberTarget = msg.guild.members.cache.get(member.id);
            memberTarget.kick().catch(console.error);
            msg.reply(`User has been kicked`);
        } else {
            msg.reply(`You could not kick that member!`);
        }
    }
});