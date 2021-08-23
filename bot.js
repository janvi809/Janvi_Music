require('dotenv').config();
const Discord = require('discord.js'); 
const MusicBot = require('music.bot');
const { Client } = require('discord.js');
const client = new Client();


const { Player } = require('discord-player');
const player = new Player(client);
client.player = player;

const settings = new MusicBot({
    botPrefix: '#',//The prefix for your bot that you will use with commands
    botClient: client,//Your client name in discord js
 // ytApiKey: `You Api yt`, //If you want to use a YouTube key from your own
 // hideHelp: true, //If you want to hide the help order
});

client.on('message', message => {
    if(message.content.startsWith(settings.prefix)) { 
        settings.onMessage(message);
    };
});


client.on('ready', () => {
    console.log(`${client.user.tag} has logged in amigos :)`);
});

client.on('message', async message => {

    if(message.author.bot) return;
console.log(`[${message.author.tag}] : ${message.content}`);

if(message.content === 'hello' || message.content==='Hello'){
    message.channel.send('Hola amigo!! wssup:)');
} 
});

client.login(process.env.DISCORDJS_BOT_TOKEN);





