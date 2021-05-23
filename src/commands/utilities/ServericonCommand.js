const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class ServericonCommand extends BaseCommand {
  constructor() {
    super('servericon', 'utilities', []);
  }

  async run(client, message, args) {
    const embed = new MessageEmbed()
    .setTitle(`${message.guild.name}'s Icon`)
    .setImage(message.guild.iconURL({ dynamic: true, size: 512 }))
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
  message.channel.send(embed);
}
};