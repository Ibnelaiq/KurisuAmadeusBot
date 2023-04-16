const { Client, GatewayIntentBits, Message } = require('discord.js');
const config = require("./config.json")
const command = require("./command")
const {init_chat} = require("./chatMiddleware")
const packageJson = require('./package.json');

// const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot Ready!');
});

command(client,["version"], message => {
    message.channel.send(`${packageJson.version}`)
})

command(client, ["c"], message => {

    const content = message.content.split(config.prefix+"c ").pop();
    // Chat init
    init_chat(content,message);

})

command(client, ["parameters"], message => {

    message.channel.send(`Temperature: ${config.model_param.temperature}`)

    message.channel.send(`Max-Length: ${config.model_param.max_length}`)

})

command(client, ["setparameter"], message => {

    const command = config.prefix+"setparameter ";
    const param = message.content.split(command).pop();

    const parameters = [
        "temperature",
        "max_length"
    ];

    if( param.trim() == command.trim()){
        // No parameter given
        message.reply("( Error ) No parameter given.")
        return;
    }

    var found = false;

    parameters.forEach(element => {
        let data = param.split(element+" ");
        console.log(data);
        // console.log(data.pop());
        if(data[0] == ''){
            found = true;
            // get selected parameter
            if(data[1] == ''){
                message.reply("( Error ) No parameter value given.")
                return;
            }

            console.log(data);
            switch (element) {
                case "temperature":
                    config.model_param.temperature = data[1]
                    message.reply("Parameter Temperature set to: "+ config.model_param.temperature)
                    break;

                default:
                    break;
            }
        }
    });

    if(found)
        return;

    message.reply("( Error ) Invalid parameter given.")
    return;
})


client.login(config.token)
