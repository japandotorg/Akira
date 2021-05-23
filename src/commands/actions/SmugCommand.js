const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = class SmugCommand extends BaseCommand {
  constructor() {
    super('smug', 'actions', []);
  }

  run(client, message, args) {
    if (!message.guild) return;
    if (message.mentions.members.size === 0) {
      async function no_ping() {
        const GIF = await neko.sfw.smug();
        const embed = new Discord.MessageEmbed()
          .setColor('#f4c2c2')
          .setTitle(`${message.author.tag} smugged by themselves`)
          .setImage(GIF.url)
        message.channel.send(embed);
      }
      no_ping();
    }
    if (message.mentions.members.size !== 0) {
      async function ping() {
        const member = message.mentions.members.first();
        const GIF = await neko.sfw.smug();
        const embed = new Discord.MessageEmbed()
          .setColor('#f4c2c2')
          .setTitle(`${message.author.tag} smugged ${member.user.tag}`)
          .setImage(GIF.url)
        message.channel.send(embed);
      }
      ping();
    }
  }
}