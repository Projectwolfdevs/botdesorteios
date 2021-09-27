const Command = require("../../Base/Command");
const ms = require("ms");

class Reroll extends Command {
    constructor(client) {
        super(client, {
            name: "de-novo",
            description: "começa o sorteio de novo",
            usage: ["reroll <giveaway_id>"],
            aliases: ["g-reroll", "reroll-giveaway", "giveaway-reroll", "greroll"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "sorteio")) return message.channel.send("❌ **Você não tem permissão para isso**!");
        let id = args[0];
        if (!id) return message.channel.send("❌ Forneça um id");
        let hasGiveaway = this.client.GiveawayManager.giveaways.find((g) => g.messageID === id);
        if (!hasGiveaway) {
            return message.channel('Nenhum id encontrado `' + id + '`');
        }
        this.client.GiveawayManager.reroll(hasGiveaway.messageID, {
            messages: {
                congrat: "🎉 Novo vencedor(s) : {winners}! 🎉",
                error: "❌ Sem participações válidas!"
            }
        })
            .then(() => {
                if (message.deletable) message.delete();
            })
            .catch((e) => {
                message.channel.send("❌ **ID INVALIDO!**");
            });
    }
}

module.exports = Reroll;
