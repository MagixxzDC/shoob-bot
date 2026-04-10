const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'dice',
  description: 'Roll a dice',
  async execute(message, args, client) {
    const sides = parseInt(args[0]) || 6;
    if (sides < 2 || sides > 100) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid Sides')
        .setDescription('Sides must be between 2 and 100.');
      return message.reply({ embeds: [embed] });
    }

    const roll = Math.floor(Math.random() * sides) + 1;

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🎲 Dice Roll')
      .setDescription(`You rolled a **d${sides}** and got: **${roll}**`)
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
