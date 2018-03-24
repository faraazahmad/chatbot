const key = 'AIzaSyC8G8FdUT82U6HO7KvKrln5Ms1O5_EpRXU';
var googleMapsClient = require('@google/maps').createClient({
    key: key,
    Promise: Promise
});

const {
    Wit,
    log
} = require('node-wit');
const wit_client = new Wit({
    accessToken: 'XWFZHKHR27JKXO5JKGQSRJQ4PZJRBQ5O'
});
const Telegraf = require('telegraf')

const bot = new Telegraf('580682022:AAEs-gNtCGaw-jl5f1wtBPcmezl0aNxauKI');
const welcome_message = "Hi! You can ask me to find anything nearby that interests you.";

let greetings = [
    "I'm good! how are you?",
    "Hey! What's up?",
    "I'm cool!",
    "i'm about to destroy humanity! see you at the apocalypse!"
]

bot.start((ctx) => ctx.reply(welcome_message));

bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))

let func_name = "";
let message = "";
bot.on('hi', (ctx) => {
    ctx.reply("Hi!");
})

const help_message = "I am the Nearby Bot. I can help you find restaurants, spas, malls, hospitals etc. in your nearby places.\n Ask me anything!";
bot.on('who are you?', (ctx) => {
    ctx.reply(help_message);
})
bot.on("what can you do for me?", (ctx) => {
    ctx.reply("I can help you find restaurants, spas, malls, hospitals etc. in your nearby places.\n Ask me anything!");
})

bot.on('text', (ctx) => {

    switch (ctx.message.text) {
        case "hello":    
        case "hi": ctx.reply("Hi!");
                    break;

        case "who are you?": ctx.reply(help_message);
                            break;

        case "good morning":
        case "good evening":
        case "good night":
                            ctx.reply(ctx.message.text + "!");
                            break;

        case "what can you do for me?": ctx.reply("I can help you find restaurants, spas, malls, hospitals etc. in your nearby places.\n Ask me anything!")
                                        break;
        default:
        
        wit_client.message(ctx.message.text, {})
        .then((data) => {
            if(data) {
                func_name = data.entities.intent[0].value;
                if(func_name == "greeting") {
                    ctx.reply(greetings[Math.floor(Math.random()*greetings.length)]);
                }
                else {
                    googleMapsClient.places({
                        query: func_name,
                        language: 'en',
                        location: [28.6667, 77.2167],
                        radius: 1000,
                        opennow: true
                    }).asPromise()
                    .then((response) => {
                        // console.log(response);
                        response.json.results.forEach((place) => {
                            if(place.rating > 0) {
                                message = "";
                                
                                message += `*${place.name}*`;
                                if(place.rating) {
                                    message += `\t★ ${place.rating}`;
                                }
                                message += ` \n${place.formatted_address}`;
                                
                                googleMapsClient.place({
                                    placeid: place.place_id,
                                    language: 'en'
                                }).asPromise()
                                .then((res) => {
                                    let result = res.json.result
                                    message += `${result.url}\n`;
                                    message += `${result.website}`;
                                })
                                
                                ctx.replyWithMarkdown(message);
                            }
                        })
                    })
                    .catch(console.error) ;
                }
            }
        })
        .catch(console.error);
    }
    });
    
    
    bot.startPolling()