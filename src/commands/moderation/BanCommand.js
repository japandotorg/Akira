const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You do not have permission to use this command**");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**I don't have permission to use this command**");

    //Variables:
    let reason = args.slice(1).join(" ")
    const mentionedMember = message.mentions.members.first();

    //Input Checking
    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send('**Please mention the user ||\`[prefix]ban @user reason\`||**');
    if (!mentionedMember) return message.channel.send('**The person you wan to ban is not in this server**');
    if (!mentionedMember.bannable) return message.channel.send('**You cannot ban someone with a higher role than you**');

    //Executing
    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`You were banned from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#d8eeee")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send("successfully banned " + mentionedMember.user.tag));
  }
}