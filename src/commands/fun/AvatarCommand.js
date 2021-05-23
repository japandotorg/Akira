const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super('avatar', 'fun', []);
  }

  run(client, message, args) {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    const embed = new Discord.MessageEmbed()
      .setTitle(mentionedMember.user.tag + "'s Avatar")
      .setColor("#f4c2c2")
      .setImage(mentionedMember.user.displayAvatarURL({ size: 2048, dynamic : true, format: "png" })); 

    message.channel.send(embed);
  }
}
