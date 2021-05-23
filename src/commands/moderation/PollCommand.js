const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class PollCommand extends BaseCommand {
  constructor() {
    super('poll', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("**||Beya dekhats|| cannot use this command**");
    if (!args.join(" ")) return message.reply("Please enter a question for the poll!")

    message.delete();

    let firstPollEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
      .setColor('#f4c2c2')
      .setDescription("⌛ Preparing a poll...")
    let secondPollEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
      .setColor('#f4c2c2')
      .setTitle("```\n📥 POLL:\n```")
      .setDescription(`**${args.join(" ")}**`)
    message.channel.send(firstPollEmbed).then((message) => {
      setTimeout(function () {
        message.edit(secondPollEmbed).then(sentMessage => {
         sentMessage.react('✅')
         sentMessage.react('❎')
        }).catch(error => {
          message.channel.send(`:x: **| There was an error executing your command:**\n\`${error}\``)
        })
      }, 2000)
    }).catch(error => {
      message.channel.send(`:x: **| There was an error executing your command:**\n\`${error}\``)
    })
  }
}