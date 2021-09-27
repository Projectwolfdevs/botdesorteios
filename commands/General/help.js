const Command = require("../../Base/Command");

class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Mostra os comandos do bot.",
            aliases: ["h", "commands"],
            usage: ["help"]
        });
    }

    async run(message, args, Discord) {
        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Total de comandos ${this.client.commands.size}`)
                .setTitle(`Comandos`)
                .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
                .setDescription(
                    `Use **${this.client.prefix}help <command>** para informação.`
                )
                .addField(
                    `Geral [${
                    this.client.commands.filter(c => c.help.category === "Geral").size
                    }]`,
                    this.client.commands
                        .filter(c => c.help.category === "Geral")
                        .map(m => `\`${m.help.name}\``)
                        .join(", ")
                )
                .addField(
                    `Sorteios [${
                    this.client.commands.filter(c => c.help.category === "Sorteios").size
                    }]`,
                    this.client.commands
                        .filter(c => c.help.category === "Sorteioss")
                        .map(m => `\`${m.help.name}\``)
                        .join(", ")
                )
                .setColor("#B10505");
            return message.channel.send(embed);
        } else {
            let cmd = this.client.fetchCommand(args[0]);
            if (!cmd) return message.channel.send("❌ **Oxi, não entendi !**");
            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTitle(cmd.help.name)
                .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
                .setDescription(cmd.help.description)
                .addField("Category", cmd.help.category)
                .addField(
                    "Aliases",
                    cmd.help.aliases.join(", ")
                )
                .addField(
                    "Usage",
                    `${
                    cmd.help.usage[0].startsWith("No")
                        ? cmd.help.usage[0]
                        : cmd.help.usage.map(m => `${this.client.prefix}${m}`).join("\n")
                    }`
                )
                .setColor("#B10505")
                .setFooter(
                    `${this.client.user.username} - Commands`,
                    this.client.user.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp();
            return message.channel.send(embed);
        }
    }
}

module.exports = Help;
