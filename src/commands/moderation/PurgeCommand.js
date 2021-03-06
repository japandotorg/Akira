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
const Discord = require('discord.js')

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {
    // Permission checking
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('**You do not have permissions to use this command**');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have \`MANAGE_NESSAGES`\ permission.');
    if (!args[0]) return message.channel.send("You must state a number of messages to purge \`[prefix]purge number\`");
    const amountToDelete = Number(args[0], 2);
    // Number checking
    if (isNaN(amountToDelete)) return message.channel.send("**Its not a valid number.**");
    if (!Number.isInteger(amountToDelete)) return message.channel.send("**Number stated must be a number, periods are not allowed**")
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send('**The number stated must be between 2 and 100**');
    const fetched = await message.channel.messages.fetch({
      Limit: amountToDelete
    });

    try {
      message.channel.messages.fetch({ limit: args[0] }).then(messages => {
        message.channel.bulkDelete(messages);
      });
    } catch (err) {
      console.log(err);
      message.channel.send(`I was unable to delete the amount stated, make sure they are within 14 days old`);
    }
  }
}