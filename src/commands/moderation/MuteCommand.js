/*
 * Copyright (c) 2021
 *
 * This file is part of Akira.
 *
 * Akira is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Akira is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Akira.  If not, see <https://www.gnu.org/licenses/>.
 *
 *
 */

const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('cmute', 'moderation', []); // if you want to use this command simply rename it from cmute to mute
  }

  async run(client, message, args) {
    // Permission checking
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('**You don\'t have permission to use this command**');
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I require \`MANAGE_CHANNELS\` permission to mute.');
    // Arguments for the mute
    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('837392525429964800');
    const memberRole = message.guild.roles.cache.get('837411790773813339');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You were muted in ${message.guild.name}`)
      .setDescription(`Reason for being muted: ${reason}`)
      .setColor("#2f3136")
      .setTimestamp()
    // options if command not used properly
    if (!args[0]) return message.channel.send('**Please mention the person you want to mute ||\`[prefix]mute @user reason\`||**');
    if (!mentionedMember) return message.channel.send('**The user you want to mute is not in this server**');
    if (!mentionedMember.user.id == message.author.id) return message.channel.send('**You can\'t mute yourself**');
    if (!mentionedMember.user.id == client.user.id) return message.channel.send(`**You cannot mute me with my own command**`);
    if (!reason) reason = 'No reason given.';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('**The user is already muted**');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('**You can\'t mute a mod or an admin**');

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the mute role.')));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue removing the member role.')));
    return message.channel.send(`The user has been muted`);
  }
}