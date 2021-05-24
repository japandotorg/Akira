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