const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class RollCommand extends BaseCommand {
  constructor() {
    super('roll', 'fun', []);
  }

  run(client, message, args) {
    let limit = args[0];
    if (!limit) limit = 6;

    const result = Math.floor(Math.random() * limit + 1);

    const embed = new Discord.MessageEmbed()
      .setTitle(`🎲 Dice Roll 🎲`)
      .setDescription(`${message.member} (\`${message.member.user.tag}\`) You rolled a die and you got **${result}** !!`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
     message.channel.send(embed);
    }
}