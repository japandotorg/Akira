const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require("quick.db");

module.exports = class WarningsCommand extends BaseCommand {
  constructor() {
    super('warnings', 'moderation', []);
  }

  async run(client, message, args) {
    const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    message.channel.send(`${user} have **${warnings}** warning(s)`);
  }
}