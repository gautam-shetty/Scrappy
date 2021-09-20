const Command = require("../../structures/Command.js");

module.exports = new Command({
    name: 'ban',
    description: 'Allows to ban a user',
    permission: 'BAN_MEMBERS',
    async run(msg, args, client) {
        if(!msg.guild.me.permissions.has('BAN_MEMBERS'))
            return msg.channel.send(`You do not have that permission.`);

        const member = msg.mentions.users.first();
        if (member) {
            const memberTarget = msg.guild.members.cache.get(member.id);
            memberTarget.ban().catch(console.error);
            msg.channel.send(`User ${member.username} has been banned`);
        } else {
            msg.channel.send(`You could not ban that member!`);
        }
    }
});