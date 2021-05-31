const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super('eval', 'owner', []);
  }

  run(client, message, args) {
    message.channel.send('eval command works');
  }
}