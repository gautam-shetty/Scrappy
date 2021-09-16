const Event = require("../structures/Event.js");

module.exports = new Event("messageCreate", (client, msg) => {
    if (!msg.content.startsWith(client.prefix)) return;

    const args = msg.content.substring(client.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (!command) return msg.reply(`${args[0]} is not a valid command!`);

    command.run(msg, args, client);
});