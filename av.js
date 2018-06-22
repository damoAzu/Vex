const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Non!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Tu ne peux pas!");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu ne peux pas");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Avertissement")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Utilisateur avertis", `<@${wUser.id}>`)
  .addField("Averti dans", message.channel)
  .addField("Nombres d'avertissements", warns[wUser.id].warns)
  .addField("Raison", reason);

  let warnchannel = message.guild.channels.find(`name`, "log");
  if(!warnchannel) return message.reply("Impossible de trouvé le salon");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "mute");
    if(!muterole) return message.reply("Tu dois créé le rôle");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> est temporairement mute`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> n'est plus mute`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> est banni.`)
  }

}

module.exports.help = {
  name: "av"
}
