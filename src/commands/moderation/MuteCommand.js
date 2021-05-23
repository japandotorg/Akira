const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  run(client, message, args) {
    message.channel.send('mute command works');
  }
}