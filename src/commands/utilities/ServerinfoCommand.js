const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ServerinfoCommand extends BaseCommand {
  constructor() {
    super('serverinfo', 'utilities', []);
  }

  run(client, message, args) {
    message.channel.send('serverinfo command works');
  }
}