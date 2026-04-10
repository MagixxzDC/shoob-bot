const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'compliment',
  description: 'Send a compliment to a user',
  async execute(message, args, client) {
    const user = message.mentions.users.first();
    if (!user) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ User Not Found')
        .setDescription('Usage: `-compliment @user`');
      return message.reply({ embeds: [embed] });
    }

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

    message.reply({ embeds: [embed] });
  },
};
