const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Information commandes")
  .setColor("#15f153")
  .setThumbnail(bicon)
  .addField("Commandes du serveur","\n-!ban \n-!exp \n-!r \n-!si \n-!tm \n-!av \n-!nav \n-!bi \n-!r \n-!coins \n-!lvl \n-!pay \n-!prefix");

  message.channel.send(botembed);
 }

 module.exports.help = {
   name:"cmd"
 }
