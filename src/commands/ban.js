const Command = require("../structures/Command.js");

module.exports = new Command({
    name: 'ban',
    description: 'Allows to ban a user',
    permission: 'BAN_MEMBERS',
    async run(msg, args, client) {
        const member = msg.mentions.users.first();
        if (member) {
            const memberTarget = msg.guild.members.cache.get(member.id);
            memberTarget.ban().catch(console.error);
            msg.reply(`User has been banned`);
        } else {
            msg.reply(`You could not ban that member!`);
        }
    }
});