const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const kissGifs = [
  'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif',
  'https://media.giphy.com/media/3o6MbjJdLJ1ZGzQGQ0/giphy.gif',
  'https://media.giphy.com/media/3o7TKz9bX9Z8h8h8h8/giphy.gif',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Kiss someone')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to kiss')
        .setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser('user');

    if (!target) {
      return interaction.reply({
        content: 'Please select a valid user.',
        ephemeral: true
      });
    }

    const gif = kissGifs[Math.floor(Math.random() * kissGifs.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('💋 Kiss')
      .setDescription(`${interaction.user} kisses ${target} 💋`)
      .setImage(gif)
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};