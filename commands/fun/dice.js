const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('Roll a dice')
    .addIntegerOption(option =>
      option
        .setName('sides')
        .setDescription('Number of sides (default 6)')
        .setMinValue(2)
        .setMaxValue(100)
        .setRequired(false)
    ),

  async execute(interaction) {
    const sides = interaction.options.getInteger('sides') || 6;
    const roll = Math.floor(Math.random() * sides) + 1;

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🎲 Dice Roll')
      .setDescription(`You rolled a **d${sides}** and got: **${roll}**`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
