const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flip a coin'),

  async execute(interaction) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🪙 Coin Flip')
      .setDescription(`The coin landed on: **${result}**`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
