require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({ 
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES
  ] 
});

client.on("ready", () => {
  console.log("PianySlap Bot is ready to go !")
})

client.on("messageCreate", msg => {
  if(msg.author.bot){
    if(msg.author.username == 'MEE6'){
      if(msg.embeds[0].description.indexOf('Bad word usage') > -1)
        msg.reply(process.env.GIF_SLAP);
    }    
    return;
  }
});

client.login(process.env.BOT_TOKEN)