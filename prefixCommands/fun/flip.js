const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'flip',
  description: 'Flip a coin',
  async execute(message, args, client) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🪙 Coin Flip')
      .setDescription(`The coin landed on: **${result}**`)
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
