const { EmbedBuilder } = require('discord.js');

const kissGifs = [
  'https://media.giphy.com/media/3o7TKz9bX9Z8h8h8h8/giphy.gif',
  'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif',
  'https://media.giphy.com/media/3o6MbjJdLJ1ZGzQGQ0/giphy.gif',
];

module.exports = {
  name: 'kiss',
  description: 'Kiss someone',

  async execute(message, args) {
    try {
      const input = args[0];
      const target = await message.resolveUser?.(input);

      if (!target) {
        return message.reply('Please mention a user or provide a valid user ID to kiss!');
      }

      const gif = kissGifs[Math.floor(Math.random() * kissGifs.length)];

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('💋 Kiss')
        .setDescription(`${message.author.username} kisses ${target.username} 💋`)
        .setImage(gif)
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return message.reply('Something went wrong.');
    }
  },
};