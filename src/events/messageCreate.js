const Event = require("../structures/Event.js");

module.exports = new Event("messageCreate", (client, msg) => {
    if (!msg.content.startsWith(client.prefix)) return;

    const args = msg.content.substring(client.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0] || (cmd.alias && cmd.alias.includes(args[0])));

    if (!command) return msg.reply(`${args[0]} is not a valid command!`);

    const permission = msg.member.permissions.has(command.permission, true);

    if (!permission) return msg.reply(`You do not have the permission ${command.permission} to run this command!`);

    command.run(msg, args, client);
});