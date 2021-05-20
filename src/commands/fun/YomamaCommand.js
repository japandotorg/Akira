const BaseCommand = require('../../utils/structures/BaseCommand');
const yoMamma = require('yo-mamma').default;

module.exports = class YomamaCommand extends BaseCommand {
  constructor() {
    super('yomama', 'fun', ['mama']);
  }

  async run(client, message, args) {
    try {
      let Message = `${yoMamma()}`;
      return message.channel.send({
        embed: {
          title: "Yo Mama Machine",
          description: Message,
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
