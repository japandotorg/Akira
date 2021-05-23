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

const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('./structures/BaseCommand');
const BaseEvent = require('./structures/BaseEvent');

async function registerCommands(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof BaseCommand) {
        const cmd = new Command();
        client.commands.set(cmd.name, cmd);
        cmd.aliases.forEach((alias) => {
          client.commands.set(alias, cmd);
        });
      }
    }
  }
}

async function registerEvents(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.events.set(event.name, event);
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

module.exports = { 
  registerCommands, 
  registerEvents,
};