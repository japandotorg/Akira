const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const Scraper = require("mal-scraper");

module.exports = class AnimesearchCommand extends BaseCommand {
  constructor() {
    super('animesearch', 'anime', ['anime', 'anisearch']);
  }

  async run(client, message, args) {
    //Start

    let Text = args[0];
    //If nothing is given
    if (!Text) return message.channel.send(`Please Give Something!`);
    //Limiting text
    if (Text.length > 200) return message.channel.send(`Text Limit - 200`);
    //Searching message
    let Msg = await message.channel.send(`**Searching It For You 🔮**`);
    
    let Replaced = Text.replace(/ +/g, " ");
    //delete the searching message
    await Msg.delete();

    let Anime;

    let Embed;

    try {

      Anime = await Scraper.getInfoFromName(Replaced);

      if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";
      //making the embed
      Embed = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setURL(Anime.url)
        .setTitle(Anime.title)
        .setDescription(Anime.synopsis)
        .addField(`Type`, Anime.type, true)
        .addField(`Status`, Anime.status, true)
        .addField(`Premiered`, Anime.premiered, true)
        .addField(`Episodes`, Anime.episodes, true)
        .addField(`Duration`, Anime.duration, true)
        .addField(`Popularity`, Anime.popularity, true)
        .addField(`Gneres`, Anime.genres.join(", "))
        .setThumbnail(Anime.picture)
        .setFooter(`Score - ${Anime.score}`)
        .setTimestamp();

    } catch (error) {
      return message.channel.send(`No Anime Found!`);
    };
    //senting the embed
    return message.channel.send(Embed);
    //End
  }
}