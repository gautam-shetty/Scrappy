const Command = require("../structures/Command.js");

module.exports = new Command({
    name: 'ping',
    description: 'Shows the ping of the bot',
    permission: 'SEND_MESSAGES',
    async run(msg, args, client) {
        msg.reply(`Ping: ${client.ws.ping} ms.`);
    }
});