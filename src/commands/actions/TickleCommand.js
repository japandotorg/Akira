const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = class TickleCommand extends BaseCommand {
  constructor() {
    super('tickle', 'actions', []);
  }

  async run(client, message, args) {
    if (!message.guild) return;
    if (message.mentions.members.size === 0) {
      async function no_ping() {
        const GIF = await neko.sfw.tickle();
        const embed = new Discord.MessageEmbed()
          .setColor('#f4c2c2')
          .setTitle(`${message.author.tag} tickles themselves`)
          .setImage(GIF.url)
        message.channel.send(embed);
      }
      no_ping();
    }
    if (message.mentions.members.size !== 0) {
      async function ping() {
        const member = message.mentions.members.first();
        const GIF = await neko.sfw.tickle();
        const embed = new Discord.MessageEmbed()
          .setColor('#f4c2c2')
          .setTitle(`${message.author.tag} tickles ${member.user.tag}`)
          .setImage(GIF.url)
        message.channel.send(embed);
      }
      ping();
    }
  }
}