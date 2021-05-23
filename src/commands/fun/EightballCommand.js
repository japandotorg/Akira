const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const answers = [
  'Maybe.',
  'Certainly not.',
  'I hope so.',
  'Not in your wildest dreams.',
  'There is a good chance.',
  'Quite likely.',
  'I think so.',
  'I hope not.',
  'I hope so.',
  'Never!',
  'Fuhgeddaboudit.',
  'Ahaha! Really?!?',
  'Pfft!',
  'Sorry, fucof.',
  'Hell yes!',
  'Hell nah!',
  'The future is bleak.',
  'The future is uncertain.',
  'I would rather not say.',
  'Who cares?',
  'Possibly',
  'Never, ever, ever!',
  'There is a small chance',
  'Yes!',
  'Shut up you smol pp.',
  'Tough talk from a guy with smol pp!'
]

module.exports = class EightballCommand extends BaseCommand {
  constructor() {
    super('eightball', 'fun', ['8ball', '8b']);
  }

  async run(client, message, args) {
    const question = args.join(' ');
    if (!question) return this.sendErrorMessage(message, 0, 'Please provide a question to ask');
    const embed = new MessageEmbed()
      .setTitle('🎱  The Magic 8-Ball  🎱')
      .addField('Question', question)
      .addField('Answer', `${answers[Math.floor(Math.random() * answers.length)]}`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};