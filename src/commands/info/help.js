const Discord = require("discord.js");
const Command = require("../../structures/Command.js");
const fs = require("fs");
const messageCreate = require("../../events/messageCreate.js");

module.exports = new Command({
    name: 'help',
    description: 'List Scarppy\'s commands available',
    permission: 'SEND_MESSAGES',
    async run(msg, args, client) {
        const directories = fs.readdirSync('./src/commands/');

        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = client.commands
                .filter((cmd) => cmd.category.toLowerCase() === dir)
                .map((cmd) => {
                    return {
                        name: cmd.name || '_no command name provided_',
                        description: cmd.description || '_no description provided_',
                    }
                });

            return {
                directory: formatString(dir),
                commands: getCommands,
            }
        });

        const embed = new Discord.MessageEmbed()
            .setDescription(`**Please choose a category**`);

        const components = (state) => [
            new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId("help-menu")
                    .setPlaceholder("Please select a category")
                    .setDisabled(state)
                    .addOptions(categories.map((cmd) => {
                        return {
                            label: cmd.directory,
                            value: cmd.directory.toLowerCase(),
                            description: `Commands from ${cmd.directory}`,
                        }
                    })
                    )
            )
        ];

        const initialMessage = await msg.channel.send({
            embeds: [embed],
            components: components(false),
        });

        /**
         * @param {Discord.Interaction} interaction
         */
        const filter = (interaction) => interaction.user.id === msg.author.id;

        const collector = msg.channel.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU"
        })

        /**
         * @param {Discord.Interaction} interaction
         */
        collector.on('collect', (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find((x) => x.directory.toLowerCase() === directory)
            const categoryEmbed = new Discord.MessageEmbed()
                .setTitle(`${formatString(directory)} commands`)
                .setDescription(`Commands List`)
                .setFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        }
                    })
                );
            interaction.update({ embeds: [categoryEmbed] });
        });

        collector.on('end', () => {
            initialMessage.edit({ components: components(true) });
        })
    }
});