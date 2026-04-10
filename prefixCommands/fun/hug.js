const { EmbedBuilder } = require('discord.js');

const hugGifs = [
  'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif',
  'https://media.giphy.com/media/3o6MbjJdLJ1ZGzQGQ0/giphy.gif',
  'https://media.giphy.com/media/3o7TKz9bX9Z8h8h8h8/giphy.gif',
  'https://media.giphy.com/media/3o7TKz9bX9Z8h8h8h8/giphy.gif',
  'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif'
];

module.exports = {
  name: 'hug',
  description: 'Give someone a hug',
  async execute(message, args, client) {
    const target = message.mentions.users.first();
    if (!target) return message.reply('Please mention a user to hug!');

    const gif = hugGifs[Math.floor(Math.random() * hugGifs.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🤗 Hug')
      .setDescription(`${message.author} hugs ${target}!`)
      .setImage(gif)
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};