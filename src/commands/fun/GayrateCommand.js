const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class GayrateCommand extends BaseCommand {
  constructor() {
    super('gayrate', 'fun', []);
  }

  run(client, message, args) {
    message.channel.send('gayrate command works');
  }
}