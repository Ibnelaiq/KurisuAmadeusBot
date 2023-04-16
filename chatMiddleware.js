const resp_exceptions = require("./responses/exceptions.json")
const {generateResponse} = require("./chat")

// All Chatting goes through this middleware
function init_chat(input,message){


    if(input == "" || input == null || input == undefined || input == "!c"){
        sendMessage(message, getRandomItemFromArray(resp_exceptions["null_message"]))
        return;
    }

    generateResponse(input).then(response => {

        if(response.length == 0 || [""," "].includes(response)){
            sendMessage(message, getRandomItemFromArray(resp_exceptions["cant_understand"]))
            return;
        }
        sendMessage(message,response,false);
        return;

    }).catch(error => {
        console.error(error);
    });

}

function sendMessage(message,content,lazy_msg = true){
    if(lazy_msg){

        message.channel.sendTyping();
        setTimeout(() => {
            message.reply(content)
          }, Math.min(content.length * 20, 1500));

    }
    else{

        message.channel.sendTyping();
        message.reply(content)

    }
}

function getRandomItemFromArray(array) {
    const randomIndex = Math.random()*array.length|0;
    return array[randomIndex];
}

module.exports = { init_chat };
