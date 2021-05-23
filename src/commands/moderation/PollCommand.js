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