const Command = require("../../Base/Command");
const ms = require("ms");
const num = require("num-parse");

class GEdit extends Command {
    constructor(client) {
        super(client, {
            name: "edit",
            description: "Edita o sorteio",
            usage: ["edit <giveaway_id> <time> <winners> <prize>"],
            aliases: ["g-edit", "edit-giveaway", "giveaway-edit", "gedit"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "sorteio")) return message.channel.send("❌ Você não permissoes para criar sorteios ou brindes!");
        let id = args[0];
        if (!id) return message.channel.send("❌Forneça um ID");
        let hasGiveaway = this.client.GiveawayManager.giveaways.find((g) => g.messageID === id);
        if (!hasGiveaway) {
            return message.channel('Não encontrei resultado para `' + id + '`');
        }
        let time = args[1];
        if (!time) return message.channel.send("❌  Forneça um horário válido. Por exemplo: `1h`,` 1d` etc.");
        if (ms(time) > ms("10d")) {
            return message.channel.send("❌ A duração da oferta deve ser inferior a 10d.");
        }
        let winners = args[2];
        if (!winners) return message.channel.send("❌ Forneça uma contagem válida de vencedores. Por exemplo: `1w`,` 2w`");
        num(winners, 1);
        if (winners > 15) return message.channel.send("❌ Os vencedores da oferta devem ter menos de 15.");
        let prize = args.slice(3).join(" ");
        if (!prize) return message.channel.send("❌ Forneça o prêmio para o sorteio. Por exemplo: `prefix?edit <giveaway_id> 1d 2w Discord Nitro`.");

        this.client.GiveawayManager.edit(hasGiveaway.messageID, {
            addTime: ms(time),
            newWinnerCount: parseInt(winners),
            newPrize: prize,
        })
        .then(() => {
            if (message.deletable) message.delete();
            return;
        }).catch((err) => {
            message.channel.send("Nenhuma oferta encontrada para " + id + "!");
        });
    }
}

module.exports = GEdit;
