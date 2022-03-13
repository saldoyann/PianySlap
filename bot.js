require("dotenv").config();

const fetch = require('node-fetch');
const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

const getArtist = new SlashCommandBuilder()
    .setName('getartist')
    .setDescription('Get Track(s) from an artist')
    .addStringOption(option => option
      .setName('artist')
      .setDescription('which artist would you ?')
      .setRequired(true));

// State of bot
client.on("ready", () => {
  console.log("PianySlap bot is ready to go !");
  // id du serveur de test : 947211184434733116
  client.guilds.cache.get('947211184434733116').commands.create(getArtist);

});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("interactionCreate", interact => {
    if(interact.isCommand()){
      if(interact.commandName === "getartist"){
        let artist = interact.options.getString('artist');
        let artistLower = artist.toLowerCase();
        let slug = artistLower.split(' ').join('-');
        let title = getPianyTrack(slug);
        const embed = new Discord.MessageEmbed()
          .setTitle(artist+" : ")
          .setColor("#373961");
        
        title.then(function(v) {
          const trackNames = v.data.artists.map( (track) => track.tracks.map( (inf) => inf.title));
          //console.log(trackNames);
          trackNames.forEach(function(value) {
            value.forEach(function(track, index){                
              embed.addField(index+": ", track, true);
            });
          }); 
        });       

        setTimeout(function(){
          //console.log(embed);
          interact.reply({ embeds: [embed] });
        }, 2000);   

      } 
    }
});

client.on("messageCreate", (msg) => {
  // Slap is a meme from N0lito about links in discord
  SlapMeme(msg);
  // 🐦 is a meme from Clyde Rouge and french community
  BouirdMeme(msg);
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
async function getPianyTrack(artist){
  const url = `https://pianity.com/api/graphql`
  const query = `
  query { 
    artists (slug:`+JSON.stringify(artist)+`){
      tracks{
        title
        releases{
          rarity
        }
        duration
        audioURL
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
  const res = await results.json();

  return res;
}