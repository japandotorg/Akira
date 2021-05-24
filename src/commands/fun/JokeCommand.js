const BaseCommand = require('../../utils/structures/BaseCommand');
var oneLinerJoke = require('one-liner-joke');

module.exports = class JokeCommand extends BaseCommand {
  constructor() {
    super('joke', 'fun', []);
  }

  async run(client, message, args) {
    try {
      return message.channel.send({
        embed: {
          title: "Random Jokes",
          description: oneLinerJoke.getRandomJoke()['body'],
          color: "#2f3136",
          footer: {
            text: "Requested by " + message.author.tag,
            icon_url: message.author.displayAvatarURL()
          },
          timestamp: new Date()
        }
      });
    }
    catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
    }
  }
};