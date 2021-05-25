const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BakaCommand extends BaseCommand {
  constructor() {
    super('baka', 'actions', []);
  }

  run(client, message, args) {
    message.channel.send('baka command works');
  }
}