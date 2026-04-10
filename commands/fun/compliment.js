const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('compliment')
    .setDescription('Send a compliment to a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to compliment')
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const compliments = [
      'amazing',
      'wonderful',
      'fantastic',
      'outstanding',
      'brilliant',
      'awesome',
      'incredible',
      'phenomenal',
      'stunning',
      'superb',
      'excellent'
    ];

    const compliment = compliments[Math.floor(Math.random() * compliments.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('💕 Compliment')
      .setDescription(`${user.toString()} is ${compliment}! 🌟`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
