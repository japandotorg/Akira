const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

const pp = [
    '8D',
    '8=D',
    '8==D',
    '8===D',
    '8====D',
    '8=====D',
    '8======D',
    '8=======D',
    '8========D',
    '8=========D',
    '8==========D',
    '8===========D',
    '8============D',
    '8=============D',
    '8==============D',
    '8===============D',
    '8================D',
    '8=================D',
    '8==================D',
    '8===================D',
    '8====================D',
    '8=====================D',
    '8======================D',
    '8=======================D',
    '8========================D',
    '8=========================D'
];

module.exports = class PpCommand extends BaseCommand {
  constructor() {
    super('pp', 'fun', []);
  }

  async run(client, message, args) {
    const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

      if (!member) return message.reply(`🔴 Mention someone or provide their user ID to get their PP Size`)

      const embed = new Discord.MessageEmbed()
      .setTitle('PP Size Detector')
      .setDescription(`${member.displayName}'s PP is this big\n\`\`\`${pp[Math.floor(Math.random() * pp.length)]}\`\`\``)
      .setFooter(`Requested by ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(member.displayHexColor);

      await message.channel.send(embed)
    }
}