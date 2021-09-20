const Command = require("../../structures/Command.js");

module.exports = new Command({
    name: 'clear',
    description: 'Clear an amount of messages',
    permission: 'MANAGE_MESSAGES',
    async run(msg, args, client) {

        const amount = args[1];
        if (!amount || isNaN(amount)) 
            return msg.reply(`${amount == undefined ? "Nothing" : amount} is not a number!`);

        const amountParsed = parseInt(amount);
        if(amountParsed > 100) 
            return msg.reply(`You cannot clear more than 100 messages at a time!`);

        msg.channel.bulkDelete(amountParsed);

        const successMsg = await msg.channel.send(`Cleared ${amountParsed} messages ☑️`);
        setTimeout(() => successMsg.delete(), 5000);
    }
})