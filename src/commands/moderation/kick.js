const Command = require("../../structures/Command.js");

module.exports = new Command({
    name: 'kick',
    description: 'Allows to kick a user',
    permission: 'KICK_MEMBERS',
    async run(msg, args, client) {
        if(!msg.guild.me.permissions.has('KICK_MEMBERS'))
            return msg.channel.send(`You do not have that permission.`);

        const member = msg.mentions.users.first();
        if (member) {
            const memberTarget = msg.guild.members.cache.get(member.id);
            memberTarget.kick().catch(console.error);
            msg.channel.send(`User ${member.username} has been kicked`);
        } else {
            msg.channel.send(`You could not kick that member!`);
        }
    }
});