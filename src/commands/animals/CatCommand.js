const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const { Client, MessageAttachment, MessageEmbed } = require("discord.js");
const got = require('got');
const fs = require("fs");


module.exports = class CatCommand extends BaseCommand {
  constructor() {
    super('cat', 'animals', []);
  }

  async run(client, message, args) {
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/cat/random/.json')
      .then(response => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
  
        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;
  
              embed.setTitle(`${memeTitle}`);
              embed.setURL(`${memeUrl}`);
        embed.setColor('RANDOM');
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
  
        message.channel.send(embed);
      })
      .catch(console.error);
    }
  };