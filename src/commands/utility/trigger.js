const Client = require("../../client/Client.js");
const Command = require("../../structures/Command.js");

module.exports = new Command({
    name: 'trigger',
    description: 'To switch trigger on/off',
    permission: 'ADMINISTRATOR',
    async run(msg, args, client) {
        if (!args[1]) return msg.reply(`Please specify if you are turning the trigger on or off!`);

        switch (args[1]) {
            default: {
                msg.reply(`A trigger only support <on/off> argument`);
                break;
            }
            case "on": {
                if (!Client.timeCheck) {
                    Client.timeCheck = setInterval(() => {
                        console.log("Twitch API Call ... ");
                    }, 5000);
                    msg.reply('Trigger started!');
                } else {
                    return msg.reply(`Trigger already running!`);
                }
                break;
            }
            case "off": {
                if (Client.timeCheck) {
                    msg.reply('Trigger is turned off!');
                    clearInterval(Client.timeCheck);
                    Client.timeCheck = undefined;
                } else {
                    return msg.reply(`Trigger already in off status!`);
                }
                break;
            }
        }
    }
});