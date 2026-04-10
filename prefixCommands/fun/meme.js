const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'meme',
  description: 'Get a random meme',
  async execute(message, args, client) {
    const memes = [
      'https://i.imgflip.com/26jxvs.jpg',
      'https://i.imgflip.com/agbic4.jpg',
      'https://i.imgflip.com/1sxsve.jpg',
      'https://i.imgflip.com/2ydegx.jpg',
      'https://i.imgflip.com/4t9d56.jpg',
    ];

    const meme = memes[Math.floor(Math.random() * memes.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🤣 Random Meme')
      .setImage(meme)
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
