require('dotenv').config()
const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client({ 
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES
  ] 
});

app.set('port', (process.env.PORT));

app.get('/', function(request, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});

client.on("ready", () => {
  console.log("PianySlap Bot is ready to go !")
})

client.on("messageCreate", msg => {
  if(msg.author.bot){
    if(msg.author.username == process.env.BOT_NAME){
      if(msg.embeds[0].description.indexOf('Bad word usage') > -1)
        msg.reply(process.env.GIF_SLAP);
    }    
    return;
  }
});

client.login(process.env.BOT_TOKEN)