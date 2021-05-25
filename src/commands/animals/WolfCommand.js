const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class WolfCommand extends BaseCommand {
  constructor() {
    super('wolf', 'animals', []);
  }

  run(client, message, args) {
    message.channel.send('wolf command works');
  }
}