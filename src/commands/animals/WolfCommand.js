const BaseCommand = require('../../utils/structures/BaseCommand');
const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = class WolfCommand extends BaseCommand {
  constructor() {
    super('wolf', 'animals', []);
  }

  async run(client, message, args) {
    const subReddits = ["wolf", "wolves"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)]

    const img = await randomPuppy(random);

    const memeEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(img)
    .setTitle(`From r/${random}`)
    .setURL(`https://reddit.com/r/${random}`)

    message.channel.send(memeEmbed);
}
}