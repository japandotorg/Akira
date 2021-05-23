const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class CoinflipCommand extends BaseCommand {
  constructor() {
    super('coinflip', 'fun', []);
  }

  async run(client, message, args) {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = 'heads';
    else result = 'tails';
    const embed = new MessageEmbed()
      .setTitle('Coinflip')
      .setDescription(`I flipped a coin for you, ${message.member}. It was **${result}**!`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};