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

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
   //Permission Checking:
   if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You do not have permission to unban someone**");
   if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("My role does not have the unban permission.");

   //Variables:
   let reason = args.slice(1).join(" ")
   let userID = args [0];

   //Input Checking
   if (!reason) reason = 'No reason given.';
   if (!args[0]) return message.channel.send('**You must mention someones ID to unban ||\`[prefix]unban ID reason\`||**');
   if (isNaN(args[0])) return message.channel.send('**The ID stated is not a number. ||\`[prefix]unban ID reason\`||**')

   //Executing
   message.guild.fetchBans().then(async bans => {
     if (bans.size == 0) return message.channel.send('**This server does not have anyone banned UwU**');
     let bUser = bans.find(b => b.user.id == userID);
     if (!bUser) return message.channel.send('**Thank god the user ID stated is not banned**');
     await message.guild.members.unban(bUser.user, reason).catch(err => {
       console.log(err);
       return message.channel.send('**Something went wrong unbanning the ID.**');
     }).then(() => {
       message.channel.send(`**Successfully unbanned** ${args[0]}`);
     });
   });
 }
}