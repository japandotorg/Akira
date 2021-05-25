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
const Discord = require("discord.js");
const { Client, MessageAttachment, MessageEmbed } = require("discord.js");
const got = require('got');
const fs = require("fs");

module.exports = class DogCommand extends BaseCommand {
  constructor() {
    super('dog', 'animals', []);
  }

  async run(client, message, args) {
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/dog/random/.json')
      .then(response => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
  
        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;
  
              embed.setTitle(`${memeTitle}`);
              embed.setURL(`${memeUrl}`);
        embed.setColor('RANDOM');
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
  
        message.channel.send(embed);
      })
      .catch(console.error);
    }
  };