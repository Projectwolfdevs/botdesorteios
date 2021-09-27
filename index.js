require("dotenv").config();
const Client = require("./Base/GiveawayBoat");
const client = new Client({
    disableMentions: "everyone"
});
const fs = require("fs");

// handle eventos
fs.readdir("./events/", (err, files) => {
    console.log(`Carregando um total de ${files.length} events.`);
    files.forEach(file => {
        const eventName = file.split(".")[0];
        console.log(`Evento carregado: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

// handle comandos
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(dir => {
        fs.readdir(`./commands/${dir}/`, (err, cmd) => {
            cmd.forEach(file => {
                if (!file.endsWith(".js")) return;
                let Props = require(`./commands/${dir}/${file}`);
                let commandName = file.split(".")[0];
                console.log(`Loading Command: ${commandName}...`);
                let props = new Props(client);
                props.help.category = dir;
                props.location = `./commands/${dir}/${file}`;
                client.commands.set(props.help.name, props);
                props.help.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            });
        });
    });
});

client.connect();


//Bot criado por #10k, disponbilizado pela Project Wolf Devs. Proibido a comerciaçização de deste arquivo, ele é totalmente gratuito. 
//https://discord.gg/yUUF9y3X7F <Entre no nosso discord/>