const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const beautify = require('beautify');

module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super('eval', 'owner', []);
  }

  async run(client, message, args) {
    
    if (message.author.id !== 759180080328081450) {
      return;
  }
  
  if (!args[0]) {
      return;
  }

  try{
      if (args.join(" ").toLowerCase().includes("token")) {
          return;
      }
  
      const toEval = args.join(" ");
      const evaluated = eval(toEval); 

      let embed = new Discord.MessageEmbed()
      .setColor("#00FF00")
      .setTimestamp()
      .setFooter(client.user.username)
      .setTitle("Eval")
      .addField("To Evaluate", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
      .addField("Evaluated:", `\`\`\`${evaluated}\`\`\``)
      .addField("Type of:", `\`\`\`${typeof(evaluated)}\`\`\``);

      message.channel.send(embed);

  } catch (e) {
      let embed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle(`🔴 Error!`)
      .setDescription(e)

      message.channel.send(embed);

  }

}

}