const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SimprateCommand extends BaseCommand {
  constructor() {
    super('simprate', 'fun', []);
  }

  async run(client, message, args) {
    const user =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const gayrate = Math.floor(Math.random() * 101)

    if (!user) return message.reply(`🔴 Provide a valid user from this guild !!`)

    const embed = new Discord.MessageEmbed()
    .setTitle(`😂 Simprate 😂`)
    .setDescription(`${user} (\`${user.user.tag}\`) is ${gayrate} % simp 😂`)
    .setTimestamp()

    message.channel.send(embed)
}
}