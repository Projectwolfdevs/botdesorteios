const Command = require("../../Base/Command");
const ms = require("ms");
const num = require("num-parse");

class GCreate extends Command {
    constructor(client) {
        super(client, {
            name: "criar",
            description: "Cria sorteios.",
            usage: ["create <time> <winners> <prize>"],
            aliases: ["g-create", "create-giveaway", "giveaway-create", "gcreate", "start"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "giveaway")) return message.channel.send("❌ Você não tem permissão necessaria para isso!");
        if (this.client.GiveawayManager.giveaways.filter((g) => g.guildID === message.guild.id && !g.ended).length + 1 > 3) return message.channel.send("❌ Limite de sorteio foi atigindo! Tente mais tarde.");
        let time = args[0];
        if (!time) return message.channel.send("❌ **Forneça um horário válido. Por exemplo:** `1h`,` 1d` etc.");
        if (ms(time) > ms("10d")) {
            return message.channel.send("❗ Que isso? dia de são nunca?, não vou aceitar isso tente uma inferior a 10d.");
        }
        let winners = args[1];
        if (!winners) return message.channel.send("❌ Forneça uma contagem válida de vencedores. Por exemplo: `1w`,` 2w");
        winners = num(winners, 1);
        if (winners > 15) return message.channel.send("❌ Os vencedores da oferta devem ter menos de 15.");
        let prize = args.slice(2).join(" ");
        if (!prize) return message.channel.send("❌ Forneça o prêmio para o sorteio. Por exemplo: `prefix? Criar 1d 2w Discord Nitro`");

        this.client.GiveawayManager.start(message.channel, {
            time: ms(time),
            winnerCount: winners,
            prize: prize,
            hostedBy: message.author,
            messages: {
                giveaway: "🎉 **Giveaway** 🎉",
                giveawayEnded: "🎊 **Giveaway Terminado!** 🎊",
                timeRemaining: "Time left: **{duration}**!",
                inviteToParticipate: "Reagir com\"🎉\" para participar!",
                winMessage: "🎊 Parabéns, {winners} por ganhar **{prize}**!",
                embedFooter: `${this.client.user.tag}`,
                noWinner: "Ninguém ganhou por causa de participações inválidas ou algum administrador cancelou.!",
                hostedBy: "Por: {user}",
                winners: "Ganhador(s)",
                endedAt: "Terminou em",
                units: {
                    seconds: "segundos",
                    minutes: "minutos",
                    hours: "horas",
                    days: "dias"
                }
            }
        });
        if (message.deletable) message.delete();
        return;
    }
}

module.exports = GCreate;
