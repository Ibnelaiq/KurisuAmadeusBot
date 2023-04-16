const {API_URL} = require("./config.json")

async function generateResponse(input) {

    const payload = {
        "text": input
    };

    const response = await new Promise((resolve, reject) => {
        fetch(API_URL, {
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data =>
            resolve(data.bot_response)
        ).catch(error => reject(error));
    });

    return response;
}

module.exports = { generateResponse };