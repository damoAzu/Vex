const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Impossible.");
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Non!");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu ne peux pas le mute");
  let muterole = message.guild.roles.find(`name`, "mute");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "mute",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Tu n'a pas spécifié le temps");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> est bien muté pendant ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> n'est plus muté!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tm"
}
