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
const Scraper = require("mal-scraper");

module.exports = class AnimesearchCommand extends BaseCommand {
  constructor() {
    super('animesearch', 'anime', ['anime', 'anisearch']);
  }

  async run(client, message, args) {
    //Start

    let Text = args[0];
    //If nothing is given
    if (!Text) return message.channel.send(`Please Give Something!`);
    //Limiting text
    if (Text.length > 200) return message.channel.send(`Text Limit - 200`);
    //Searching message
    let Msg = await message.channel.send(`**Searching It For You 🔮**`);
    
    let Replaced = Text.replace(/ +/g, " ");
    //delete the searching message
    await Msg.delete();

    let Anime;

    let Embed;

    try {

      Anime = await Scraper.getInfoFromName(Replaced);

      if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";
      //making the embed
      Embed = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setURL(Anime.url)
        .setTitle(Anime.title)
        .setDescription(Anime.synopsis)
        .addField(`Type`, Anime.type, true)
        .addField(`Status`, Anime.status, true)
        .addField(`Premiered`, Anime.premiered, true)
        .addField(`Episodes`, Anime.episodes, true)
        .addField(`Duration`, Anime.duration, true)
        .addField(`Popularity`, Anime.popularity, true)
        .addField(`Gneres`, Anime.genres.join(", "))
        .setThumbnail(Anime.picture)
        .setFooter(`Score - ${Anime.score}`)
        .setTimestamp();

    } catch (error) {
      return message.channel.send(`No Anime Found!`);
    };
    //senting the embed
    return message.channel.send(Embed);
    //End
  }
}