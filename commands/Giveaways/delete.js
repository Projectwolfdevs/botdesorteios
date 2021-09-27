const Command = require("../../Base/Command");
const ms = require("ms");

class GDel extends Command {
    constructor(client) {
        super(client, {
            name: "apagar",
            description: "Apaga o giveaway/sorteio", 
            usage: ["delete <giveaway_id>"],
            aliases: ["g-delete", "delete-giveaway", "giveaway-delete", "gdelete", "apagarsorteio"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "Sorteio")) return message.channel.send("❌ Você não tem permissão para isso!");
        let id = args[0];
        if (!id) return message.channel.send("❌ **Por favor, mencione o id do sorteio.**");
        let hasGiveaway = this.client.GiveawayManager.giveaways.find((g) => g.messageID === id);
        if (!hasGiveaway) {
            return message.channel('Não encontrei`' + id + '`');
        }
        this.client.GiveawayManager.delete(hasGiveaway.messageID)
        .then(() => {
            if (message.deletable) message.delete();
            return;
        })
        .catch((e) => {
            message.channel.send("Nenhum sorteio encontrado para `"+id+"`!");
        });
    }
}

module.exports = GDel;
