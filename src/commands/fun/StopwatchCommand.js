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
const ms = require('ms')

module.exports = class StopwatchCommand extends BaseCommand {
    constructor() {
      super('remindme', 'fun', ['rme']);
    }

    async run(client, message, args) {
      args = args.join(" ").split(" | ");
    
      let remindTime = args[0];
          const remindTimeError = new Discord.MessageEmbed()
                .setColor('#ed455a')
                .setTitle('• Error: 01 •')
                .setDescription('```You did not specify a time for your reminder```')
      if(!remindTime) return message.channel.send(remindTimeError)
        
      let reminderMessage = args[1]
          const reminderMessageError = new Discord.MessageEmbed()
                .setColor('#ed455a')
                .setTitle('• Error: 02 •')
                .setDescription('```You did not create a message for your reminder```')
      if(!reminderMessage) return message.channel.send(reminderMessageError)
          
      const setReminder = new Discord.MessageEmbed()
            .setTitle('⏰ Reminder has been set! ⏰')
            .setColor('#41baea')
            .addField('**I will remind you in**', `*${ms(ms(remindTime))}*`)
            .addField('**Your reminder is**', `*${reminderMessage}*`)
      
      const reminder = new Discord.MessageEmbed()
            .setTitle('⏰ Reminder! ⏰')
            .setColor('#41baea')
            .setDescription(reminderMessage)
      
      message.delete()
      message.author.send(setReminder)
    
      setTimeout(function(){
        message.author.send(reminder)
        }, ms(remindTime));
      }
    }