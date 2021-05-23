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
const {
  MessageEmbed
} = require("discord.js")
const moment = require("moment")

module.exports = class UserinfoCommand extends BaseCommand {
  constructor() {
    super('userinfo', 'utilities', ['whois', 'ui']);
  }

  async run(client, message, args) {
    let member;
    if (!args.length) {
      // Display info about the calling user
      member = message.guild.member(message.author);
    } else {
      // Display info about the user specified by the first argument
      member = message.guild.member(message.mentions.users.first());

      // Check we were able to retrieve the member (member is undefined)
      if (!member) {
        return message.reply(
          `I couldn't find a user with the ID \`${args[0]}\``
        );
      }
    }
    // Format Permissions
    const permissions = member.permissions.toArray().map(perm => {
      return perm
        .toLowerCase()
        .replace(/_/g, " ") // Replace all underscores with spaces
        .replace(/\w\S*/g, txt => {
          // Capitalize the first letter of each word
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    });

    // Calculate Join Position
    let joinPosition;
    const members = message.guild.members.cache.array();
    members.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < members.length; i++) {
      if (members[i].id == message.guild.member(message.author).id)
        joinPosition = i;
    }

    // Construct Reply
    const embed = {
      embed: {
        color: 3447003,
        title: `${member.user.tag}`,
        thumbnail: {
          url: member.user.avatarURL()
        },
        description: `${member.displayName}`,
        fields: [{
            name: "Created",
            value: `${member.user.createdAt.toDateString()} at ${member.user.createdAt.toTimeString()}`
          },
          {
            name: "Joined",
            value: `${member.joinedAt.toDateString()} at ${member.joinedAt.toTimeString()}`
          },
          {
            name: "Join Position",
            value: joinPosition
          },
          {
            name: "Permissions",
            value: permissions.join(", ")
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `ID: ${member.id}`
        }
      }
    };

    return message.channel.send(embed);
  }
}