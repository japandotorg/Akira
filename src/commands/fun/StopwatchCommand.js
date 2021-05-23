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