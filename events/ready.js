module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        this.client.user.setActivity(`by 10K`, {
            type: "LISTENING"
        });
        console.log(`${this.client.user.tag}, Assistindo ${this.client.users.cache.size} usuários e ${this.client.guilds.cache.size} servers.`);
    }
}