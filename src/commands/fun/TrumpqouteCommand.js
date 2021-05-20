const BaseCommand = require('../../utils/structures/BaseCommand');
const request = require('node-superfetch');

module.exports = class TrumpqouteCommand extends BaseCommand {
  constructor() {
    super('trumpqoute', 'fun', ['trq']);
  }

  async run(client, message, args) {
    try {
      const { body } = await request.get('https://www.tronalddump.io/random/quote');

      return message.channel.send({
          embed: {
              title: "Trump Quotes",
              description: body.value,
              color: "#2f3136",
              footer: {
                  text: "Requested by " + message.author.tag,
                  icon_url: message.author.displayAvatarURL()
              },
              timestamp: new Date()
          }
      });
  } catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
  }
}
};
