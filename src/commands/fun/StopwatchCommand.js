const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class StopwatchCommand extends BaseCommand {
  constructor() {
    super('stopwatch', 'fun', []);
  }

  run(client, message, args) {
    message.channel.send('stopwatch command works');
  }
}