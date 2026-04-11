const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const slapGifs = [
  'https://media.giphy.com/media/3o7TKz9bX9Z8h8h8h8/giphy.gif',
  'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif',
  'https://media.giphy.com/media/3o6MbjJdLJ1ZGzQGQ0/giphy.gif',
  'https://media.giphy.com/media/3o7TKz9bX9Z8h8h8h8/giphy.gif',
  'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Slap someone')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to slap')
        .setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const gif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('👋 Slap')
      .setDescription(`${interaction.user} slaps ${target}!`)
      .setImage(gif)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};