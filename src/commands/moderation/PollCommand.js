const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');


module.exports = class PollCommand extends BaseCommand {
  constructor() {
    super('poll', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You're not allowed to use this command!") //remove this line of code to allow everyone to use
    const pollChannel = message.channel
    const pollTitle = message.content.split(' ').splice(1).join(' ');
    if (!pollTitle) return message.reply("Specify a Title!");
    pollTitle.replace(" ", " ");
    const pollEmbed1 = new Discord.MessageEmbed()
        .setTitle("Creating Poll...")
        .setColor("#ff8c00")
    const pollEmbed2 = new Discord.MessageEmbed()
        .setTitle("Sending Poll...")
        .setColor("#ff8c00")
    const pollEmbed3 = new Discord.MessageEmbed()
        .setTitle("Poll Send...")
        .setDescription("**Adding Reactions**")
        .setColor("#ff8c00")
    const pollEmbed4 = new Discord.MessageEmbed()
        .setTitle("Reactions Added")
        .setColor("#ff8c00")
    message.channel.send(pollEmbed1).then(poll => {
        const pollStatus = poll
        const pollEmbed = new Discord.MessageEmbed()
            .setTitle("Poll")
            .setDescription(`${pollTitle}`)
            .setTimestamp()
            .setColor("BLUE")
        pollStatus.edit(pollEmbed2)
        pollChannel.send(pollEmbed).then(embed => {
            pollStatus.edit(pollEmbed3)
            embed.react("👍")
            setTimeout(() => {
                embed.react("👎")
                pollStatus.edit(pollEmbed4)
                setTimeout(() => {
                    pollStatus.delete()
                    message.delete()
                }, 6000);
            }, 2300)
        })
    })
}
}