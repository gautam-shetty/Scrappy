const Discord = require("discord.js");
const Command = require("../structures/Command.js");
const Event = require("../structures/Event.js");
const fs = require("fs");
const config = require("../data/config.json");

// 32767 to include all intents flag
const intents = new Discord.Intents(32767);

class Client extends Discord.Client {
    constructor() {
        super({ intents });

        /**
         * @type {Discord.Collection<String, Command>}
         */
        this.commands = new Discord.Collection();
        this.prefix = config.prefix;
    }

    start(token) {
        console.group('Bot Loader:');

        // Commands Loader
        console.group('Commands Loader:');
        fs.readdirSync('./src/commands/').forEach(dir => {
            // Commands category
            console.group(`Category ${dir}`);
            fs.readdirSync(`./src/commands/${dir}/`)
                .filter(file => file.endsWith('.js'))
                .forEach(file => {
                    /**
                     * @type {Command}
                     */
                    const command = require(`../commands/${dir}/${file}`);
                    command.category = dir[0].toUpperCase() + dir.slice(1).toLowerCase();
                    console.log(`Command ${command.name} loaded`);
                    this.commands.set(command.name, command);
                });
            console.groupEnd();
        });
        console.groupEnd();

        // Events Loader
        console.group('Events Loader:');
        fs.readdirSync('./src/events')
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                /**
                 * @type {Event}
                 */
                const event = require(`../events/${file}`);
                console.log(`Event ${event.event} loaded`);
                this.on(event.event, event.run.bind(null, this));
            })
        console.groupEnd();

        console.groupEnd();
        this.login(token);
    }
}

module.exports = Client;
module.exports.timeCheck = undefined;
module.exports.val = 0;