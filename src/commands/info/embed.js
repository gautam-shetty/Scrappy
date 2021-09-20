const Discord = require("discord.js");
const Command = require("../../structures/Command.js");

module.exports = new Command({
    name: 'embed',
    description: 'Shows an embedded message',
    permission: 'SEND_MESSAGES',
    async run(msg, args, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Test Embed msg")
            .setColor('#0099ff')
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

        msg.reply({ embeds: [embed] });
    }
});