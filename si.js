const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Créé le", message.guild.createdAt)
    .addField("Tu a rejoin le serveur le", message.member.joinedAt)
    .addField("Total Membres", message.guild.memberCount);


    message.channel.send(serverembed);
}

module.exports.help = {
  name:"si"
}
