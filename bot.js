require('dotenv').config();
const Discord = require('discord.js'); 
const MusicBot = require('music.bot');
const { Client } = require('discord.js');
const client = new Client();
let puppeteer = require("puppeteer");
let url = "https://www.mygov.in/covid-19";
let request = require("request");
let cheerio = require("cheerio");
let fs  = require("fs");


const { Player } = require('discord-player');
const player = new Player(client);
client.player = player;

const settings = new MusicBot({
    botPrefix: '#',//The prefix for your bot that you will use with commands
    botClient: client,//Your client name in discord js
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

if(message.content=='#covid'){
    let browserStartPromise = puppeteer.launch({
        // visible 
        headless: false,
        // type 1sec // slowMo: 1000,
        defaultViewport: null,
        // browser setting 
        args: ["--start-maximized", "--disable-notifications"]
    });
    let page, browser, rTab;
    browserStartPromise
        .then(function (browserObj) {
            console.log("Browser opened");
            // new tab 
            browser = browserObj
            let browserTabOpenPromise = browserObj.newPage();
            return browserTabOpenPromise;
        }).then(function (newTab) {
            page = newTab
            console.log("new tab opened ")
            let gPageOpenPromise = newTab.goto("https://www.mygov.in/covid-19", {waitUntil : 'load'});
            return gPageOpenPromise;
        })
         
       
}

if(message.content=='#covidinfo'){
    request(url, cb);
    function cb(error, response, html) {
        if (error) {
            console.log(error); // Print the error if one occurred
        } else if (response.statusCode == 404) {
            console.log("Page Not Found")
        }
        else {
            // console.log(html); // Print the HTML for the request made 
            dataExtracter(html);
        }
    }

    function dataExtracter(html) {
        let searchTool = cheerio.load(html);
        fs.writeFileSync("covid.html",html);
        let caseArr = searchTool(".icount");
         console.log(caseArr.length);
         let cases = searchTool(caseArr[0]).text();
         let cases1 = searchTool(caseArr[1]).text();
             message.channel.send("Active cases: " + cases);
             message.channel.send("Total cases: " + cases1);
        
    }
}


});




client.login(process.env.DISCORDJS_BOT_TOKEN);





