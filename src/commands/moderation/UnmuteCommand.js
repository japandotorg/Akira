const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('cunmute', 'moderation', []); // if you want to use this command simply rename it from cunmute to unmute
  }

  async run(client, message, args) {
    // Permission checking
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('**You don\'t have permission to use this command**');
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I require \`MANAGE_CHANNELS\` permission to unmute.');
    // Arguments for the mute
    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('837392525429964800');
    const memberRole = message.guild.roles.cache.get('837411790773813339');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You were unmuted in ${message.guild.name}`)
      .setDescription(`Reason for being unmuted: ${reason}`)
      .setColor("#2f3136")
      .setTimestamp()
    // options if the command is not used properly
    if (!args[0]) return message.channel.send('**You need to mention the user you want to unmute ||\`[prefix]unmute @user reason\`||**');
    if (!mentionedMember) return message.channel.send('**The user you want to unmute is not in this server**');
    if (!mentionedMember.user.id == message.author.id) return message.channel.send('**You can\'t unmute yourself**');
    if (!mentionedMember.user.id == client.user.id) return message.channel.send('**You cannot unmute me with my own command, but why mute me at all?**');
    if (!reason) reason = 'No reason given.';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('**The user is already unmuted**');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot unmute some the same role or higher than you');

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue removing the mute role.')));
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the member role.')));
    return message.channel.send(`The user has been unmuted`);
  }
}