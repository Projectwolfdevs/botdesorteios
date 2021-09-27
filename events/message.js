const Discord = require("discord.js");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        // retorno se não for da guild
        if (!message.guild || message.author.bot) return;
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
        if (!message.guild.me.hasPermission("EMBED_LINKS")) return;
        
        // verifica o prefixo mude o "s?" para "seu prefixo"
        const prefixes = ["s?", "S?", `<@${this.client.user.id}>`, `<@!${this.client.user.id}>`];
        let prefix = false;
        for (const Prefix of prefixes) {
            if (message.content.startsWith(Prefix)) prefix = Prefix;
        }
        if (!prefix) return;
        this.client.prefix = prefix;

        // comandos e argumentos
        const args = message.content.slice(prefix.length).trim().split(" ");
        const command = args.shift().toLowerCase();
        const cmd = this.client.fetchCommand(command);
        if (!cmd) return;

        // manipulada o comando (command handler)
        cmd.run(message, args, Discord);
    }
}
