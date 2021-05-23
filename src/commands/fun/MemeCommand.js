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
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'fun', []);
  }

  async run(client, message, args) {
    const data = await fetch(`https://meme-api.herokuapp.com/gimme`)
      .then(res => res.json())
      .catch(() => null);

    if (!data) {
      return message.channel.send(`Server Error 5xx: Meme API is currently down!`);
    }

    return message.channel.send(
      new MessageEmbed()
      .setColor('GREY')
      .setImage(data.url)
      .setAuthor(data.title, null, data.postLink)
      .setFooter(`${data.subreddit}:Meme | Made with ❤ by Lemon`)
    );
  }
};