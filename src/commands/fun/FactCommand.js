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

module.exports = class FactCommand extends BaseCommand {
  constructor() {
    super('fact', 'fun', []);
  }

  async run(client, message, args) {
    try {
      const request = require('superagent')
      request.get('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(res => {
          if (res.statusCode !== 200 || !res.body.text) return;
          return message.channel.send({
            embed: {
              title: "Fact Machine",
              description: res.body.text,
              color: "#2f3136",
              footer: {
                text: "Requested by " + message.author.tag,
                icon_url: message.author.displayAvatarURL()
              },
              timestamp: new Date()
            }
          });
        })
    } catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
    }
  }
};