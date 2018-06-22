const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Impossible de trouvé l'Utilisateur");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Non!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("La personne ne peut pas être banni!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Utilisateur banni", `${bUser} Son ID ${bUser.id}`)
    .addField("Banni par", `<@${message.author.id}> Son ID ${message.author.id}`)
    .addField("Banni dans", message.channel)
    .addField("Heure", message.createdAt)
    .addField("Raison", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "log");
    if(!incidentchannel) return message.channel.send("Impossible de trouvé le salon log");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
