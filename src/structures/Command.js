const Discord = require("discord.js");
const Client = require("../client/Client.js");

/**
 * @param {Discord.Message | Discord.Interaction} msg 
 * @param {string[]} args 
 * @param {Client} client 
 */
function RunFunction(msg, args, client) { }

class Command {
    /**
     * @typedef {{name: string, 
     * alias: string[], 
     * category: string, 
     * description: string, 
     * permission: Discord.PermissionString, 
     * run: RunFunction}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.alias = options.alias;
        this.category = options.category;
        this.description = options.description;
        this.permission = options.permission;
        this.run = options.run;
    }
}

module.exports = Command;