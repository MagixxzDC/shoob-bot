// const { EmbedBuilder } = require('discord.js');

// module.exports = {
//   name: 'rate',
//   description: 'Rate something',
//   async execute(message, args, client) {
//     const thing = args.join(' ') || 'this message';
//     const rating = Math.floor(Math.random() * 11);
//     const ratingBar = '█'.repeat(rating) + '░'.repeat(10 - rating);

//     const embed = new EmbedBuilder()
//       .setColor('#141414')
//       .setTitle('⭐ Rating')
//       .addFields(
//         { name: 'Thing', value: thing },
//         { name: 'Rating', value: `${ratingBar} ${rating}/10` }
//       )
//       .setTimestamp();

//     message.reply({ embeds: [embed] });
//   },
// };
