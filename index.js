// const google = require('googleapis');
// var urlshortener = google.urlshortener('v1');
const mapper = {
    "colleges": ,
    "weather": ,
    "malls": ,
    "hospitals": ,
    "police": ,
    "hotels": ,
    "metro stations": ,
    "schools": ,
    "restraunts": ,
    "bars": ,
    "nearby": ,
    "pizza": ,
    "gyms": ,
}

const {
    Wit,
    log
} = require('node-wit');
const Telegraf = require('telegraf')

const wit_client = new Wit({
    accessToken: 'XWFZHKHR27JKXO5JKGQSRJQ4PZJRBQ5O'
});

var params = {
    shortUrl: 'http://goo.gl/xKbRu3',
    key: 'AIzaSyC8G8FdUT82U6HO7KvKrln5Ms1O5_EpRXU'
};

const bot = new Telegraf('580682022:AAEs-gNtCGaw-jl5f1wtBPcmezl0aNxauKI');
const welcome_message = "Hi! You can ask me to find anything nearby that interests you.";

bot.start((ctx) => ctx.reply(welcome_message));

bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))


bot.on('text', (ctx) => {
    wit_client.message(ctx.message.text, {})
    .then((data) => {
        let func_name = data.entities.intent[0].value;
        ctx.reply(func_name);
    })
    .catch(console.error);
})

bot.startPolling()