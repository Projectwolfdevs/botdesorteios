const Command = require("../../Base/Command");
const ms = require("ms");

class GEnd extends Command {
    constructor(client) {
        super(client, {
            name: "fim",
            description: "Ends the giveaway.",
            usage: ["end <giveaway_id>"],
            aliases: ["g-end", "end-giveaway", "giveaway-end", "gend", "stop"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "sorteio")) return message.channel.send("❌ **Você não pode fazer isso!**");
        let id = args[0];
        if (!id) return message.channel.send("❌ Forneça uma identificação, id");
        let hasGiveaway = this.client.GiveawayManager.giveaways.find((g) => g.messageID === id);
        if (!hasGiveaway) {
            return message.channel('Nenhum id encontrado `' + id + '`');
        }
        this.client.GiveawayManager.edit(hasGiveaway.messageID, {
            setEndTimestamp: Date.now()
        })
        .then(() => {
            message.channel.send('Sorteio terminara em menos de ' + (this.client.GiveawayManager.options.updateCountdownEvery / 1000) + ' seconds...').then(m => m.delete({ timeout: 2000 }));
        })
        .catch((e) => {
            message.channel.send("Puts, algou de errado não está certo. ```js\n"+e.message + "```");
        });
        if (message.deletable) message.delete();
        return;
    }
}

module.exports = GEnd;
