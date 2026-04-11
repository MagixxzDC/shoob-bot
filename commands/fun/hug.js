const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const hugGifs = [
  'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif',
  'https://media.giphy.com/media/3o6MbjJdLJ1ZGzQGQ0/giphy.gif',
  'https://media.giphy.com/media/3o7TKz9bX9Z8h8h8h8/giphy.gif',
  'https://media.giphy.com/media/3o7TKz9bX9Z8h8h8h8/giphy.gif',
  'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Give someone a hug')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to hug')
        .setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const gif = hugGifs[Math.floor(Math.random() * hugGifs.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🤗 Hug')
      .setDescription(`${interaction.user} hugs ${target}!`)
      .setImage(gif)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};