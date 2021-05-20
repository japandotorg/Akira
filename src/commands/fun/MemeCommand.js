const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'fun', []);
  }

  run(client, message, args) {
    message.channel.send('meme command works');
  }
}