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
const request = require('node-superfetch');

module.exports = class TrumpqouteCommand extends BaseCommand {
  constructor() {
    super('trumpqoute', 'fun', ['trq']);
  }

  async run(client, message, args) {
    try {
      const { body } = await request.get('https://www.tronalddump.io/random/quote');

      return message.channel.send({
          embed: {
              title: "Trump Quotes",
              description: body.value,
              color: "#2f3136",
              footer: {
                  text: "Requested by " + message.author.tag,
                  icon_url: message.author.displayAvatarURL()
              },
              timestamp: new Date()
          }
      });
  } catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
  }
}
};
