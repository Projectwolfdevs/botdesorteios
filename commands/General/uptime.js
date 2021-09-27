const Command = require("../../Base/Command");
const moment = require('moment');
require('moment-duration-format');

class Uptime extends Command {
    constructor(client) {
        super(client, {
            name: "tempoon",
            description: "Tempo de atividade",
            aliases: [],
            usage: ["uptime"]
        });
    }

    async run(message, args, Discord) {
        const duration = moment.duration(this.client.uptime).format(' D [Days], H [Hours], m [Minutes], s [Seconds]');
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('Tempo de atividade')
            .setThumbnail(`${this.client.user.displayAvatarURL(({ dynamic: true }))}`)
            .addField("Tempo:", `${duration}`)
            .setFooter(`${this.client.user.username}`, `${this.client.user.displayAvatarURL({ dynamic: true })}`)
            .setTimestamp()
        return message.channel.send(embed);
    }
}

module.exports = Uptime;
