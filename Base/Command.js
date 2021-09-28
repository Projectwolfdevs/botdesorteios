class Command {
    /**
     *
     * @param {Client} client Discord Client
     * @param {Object} ootions command conf
     */
    constructor(
        client,
        {
            name = null,
            description = "blablablabla fodase, preguiça",
            category = "Other",
            usage = ["No usage provided."],
            aliases = new Array()
        }
    ) {
        this.client = client;
        this.help = { name, description, category, usage, aliases };
    }
}
module.exports = Command;
//PROJECTWOLF
