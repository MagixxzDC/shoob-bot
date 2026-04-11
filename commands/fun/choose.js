const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('choose')
    .setDescription('Choose between options')
    .addStringOption(option =>
      option
        .setName('options')
        .setDescription('Options separated by commas (e.g., "pizza, burger, tacos")')
        .setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const optionsString = interaction.options.getString('options');
    const options = optionsString.split(',').map(opt => opt.trim());

    if (options.length < 2) {
      return interaction.reply({
        content: '❌ Please provide at least 2 options separated by commas.',
        ephemeral: true,
      });
    }

    const choice = options[Math.floor(Math.random() * options.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('✨ Random Choice')
      .addFields(
        { name: 'Options', value: options.join(', ') },
        { name: 'I chose', value: `**${choice}**` }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
