const Command = require("../../Base/Command");

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "mostra a latencia.",
            usage: ["ping"],
            aliases: ["pong", "latency"]
        });
    }

    async run(message, args, Discord) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Pong!")
            .setDescription(
                `Ping da Web: ${
                this.client.ws.ping ? Math.floor(this.client.ws.ping) : 0
                }ms\nPing do bot: ${Math.round(
                    Date.now() - message.createdTimestamp
                )}ms`
            )
            .setColor("#B10505");
        return message.channel.send(embed);
    }
}

module.exports = Ping;
