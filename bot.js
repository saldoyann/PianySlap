require("dotenv").config();

const fetch = require('node-fetch');
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

// State of bot
client.once("ready", () => {
  console.log("PianySlap bot is ready to go !");
});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("messageCreate", (msg) => {
  // Slap is a meme from N0lito about links in discord
  SlapMeme(msg);
  // 🐦 is a meme from Clyde Rouge and french community
  BouirdMeme(msg);

  getPianyTrack(msg);
});

client.login(process.env.BOT_TOKEN);

/* MAIN FUNCTION */

// Slap is a meme from N0lito about links in discord
function SlapMeme(msg) {
  if (msg.author.bot && msg.author.username == process.env.BOT_NAME) {
    if (msg.embeds[0].description.indexOf(process.env.DESCR) > -1) {
      msg.reply(process.env.GIF_SLAP);
      console.log("Piany Slap user!");
    }
  }
}

// 🐦 is a meme from Clyde Rouge and french community
// Clyde Discord id is 657617401583632446
function BouirdMeme(msg) {
  let msgContentLower = msg.content.toLowerCase();
  if (
    msgContentLower.includes("bouird") ||
    msgContentLower.includes("bouirds") ||
    (msgContentLower.includes("morning") && msg.author.id == "657617401583632446")
  ) {
    msg.react("🐦");
    console.log("React 🐦 to " + msg.author.username + " because says " + msgContentLower)
  }
}

// GET Track from Pianity
async function getPianyTrack(msg){
  if(msg.content.includes('getTrack')){
    const url = `https://pianity.com/api/graphql`
    const query = `
    query { 
      tracks {
        results(limit: 10) {
          id
        }
      }
    }
  `;

    const options =  {
      method: "POST",
      body: JSON.stringify({query}),
      headers: { "Content-Type": "application/json" } 
    };

    const results = await fetch(url, options)
    const tracks = await results.json();
    
    for (const prop in tracks){
      console.log(`${prop}: ${tracks[prop]}`);
    }
    /*Object.entries(tracks).forEach(( [key, value]) => {
        console.log(Object.entries(key));
    });*/
  }
}