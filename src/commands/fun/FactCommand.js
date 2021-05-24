const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class FactCommand extends BaseCommand {
  constructor() {
    super('fact', 'fun', []);
  }

  async run(client, message, args) {
    try {
      const request = require('superagent')
      request.get('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(res => {
          if (res.statusCode !== 200 || !res.body.text) return;
          return message.channel.send({
            embed: {
              title: "Fact Machine",
              description: res.body.text,
              color: "#2f3136",
              footer: {
                text: "Requested by " + message.author.tag,
                icon_url: message.author.displayAvatarURL()
              },
              timestamp: new Date()
            }
          });
        })
    } catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
    }
  }
};