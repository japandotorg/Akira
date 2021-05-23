const BaseCommand = require('../../utils/structures/BaseCommand');
let answers = [
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
  'Tough talk from a guy with smol pp!',
  'Cannot answer to a beya dekhat!'
]

module.exports = class EightballCommand extends BaseCommand {
  constructor() {
    super('eightball', 'fun', []);
  }

  async run(client, message, args) {
    const BallNumber = Math.floor(Math.random() * answers.length);
    const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
    message = await message.channel.send(answers[BallNumber]);
  }
}