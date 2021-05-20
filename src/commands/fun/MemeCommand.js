const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'fun', []);
  }

  async run(client, message, args) {
    const data = await fetch(`https://meme-api.herokuapp.com/gimme`)
      .then(res => res.json())
      .catch(() => null);

    if (!data) {
      return message.channel.send(`Server Error 5xx: Meme API is currently down!`);
    }

    return message.channel.send(
      new MessageEmbed()
      .setColor('GREY')
      .setImage(data.url)
      .setAuthor(data.title, null, data.postLink)
      .setFooter(`${data.subreddit}:Meme | Made with ❤ by Lemon`)
    );
  }
};