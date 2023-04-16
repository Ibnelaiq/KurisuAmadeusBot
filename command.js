const {prefix} = require("./config.json")


module.exports = (client, aliases, callback) => {

    aliases.map(alias => alias.toLowerCase()).forEach(alias => {

        client.on('messageCreate', message => {

            message.content = message.content.toLowerCase()

            const command = `${prefix}${alias}`

            if(message.content.startsWith(`${command} `) || message.content === command){
                callback(message)
            }

        })
    });

}