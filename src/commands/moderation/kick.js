const Command = require("../../structures/Command.js");

module.exports = new Command({
    name: 'kick',
    description: 'Allows to kick a user',
    permission: 'KICK_MEMBERS',
    async run(msg, args, client) {

        const member = msg.mentions.users.first();
        const reason = args.slice(2, args.length).join(' ') || "No reason provided";

        if (member) {
            const memberTarget = msg.guild.members.cache.get(member.id);
            await memberTarget.kick(reason).catch(console.error);
            msg.channel.send(`User \'${member.username}\' has been kicked.\nReason: ${reason}`);
        } else {
            msg.channel.send(`You could not kick that member!`);
        }
    }
});