const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Impossible de trouvé l'utilisateur");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Non");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("la personne est bien expulsé");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Utilisateur explusé", `${kUser} Son ID ${kUser.id}`)
    .addField("Explusé par", `<@${message.author.id}> Son ID ${message.author.id}`)
    .addField("Explusé dans", message.channel)
    .addField("Heure", message.createdAt)
    .addField("Raison", kReason);

    let kickChannel = message.guild.channels.find(`name`, "log");
    if(!kickChannel) return message.channel.send("Impossible de trouvé le salon log");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"expulsé"
}
