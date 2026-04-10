const { EmbedBuilder } = require('discord.js');

const slapGifs = [
  'https://media.giphy.com/media/3o6MbjJdLJ1ZGzQGQ0/giphy.gif',
  'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif',
  'https://media.giphy.com/media/3o7TKz9bX9Z8h8h8h8/giphy.gif',
];

module.exports = {
  name: 'slap',
  description: 'Slap someone',

  async execute(message, args) {
    try {
      const target = await message.getUser?.(args[0]);

      if (!target) {
        return message.reply('Please mention a user or provide a valid user ID to slap!');
      }

      const gif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('👋 Slap')
        .setDescription(`${message.author.username} slapped ${target.username}!`)
        .setImage(gif)
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return message.reply('Something went wrong.');
    }
  },
};