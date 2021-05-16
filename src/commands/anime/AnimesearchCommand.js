const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class AnimesearchCommand extends BaseCommand {
  constructor() {
    super('animesearch', 'anime', []);
  }

  run(client, message, args) {
    message.channel.send('animesearch command works');
  }
}