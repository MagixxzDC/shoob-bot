const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: '8ball',
  description: 'Ask the magic 8 ball',
  async execute(message, args, client) {
    const responses = [
      'Yes, definitely!',
      'No, definitely not.',
      'Maybe...',
      'Ask again later.',
      'Without a doubt!',
      'Very doubtful.',
      'Signs point to yes.',
      'Don\'t count on it.',
      'Outlook good!',
      'My sources say no.',
      'Absolutely!',
      'Not in a million years.',
      'The stars align for yes.',
      'Concentrate and ask again.',
    ];

    const question = args.join(' ');
    if (!question) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('Usage: `-8ball <question>`');
      return message.reply({ embeds: [embed] });
    }

    const answer = responses[Math.floor(Math.random() * responses.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🎱 Magic 8 Ball')
      .addFields(
        { name: 'Question', value: question },
        { name: 'Answer', value: answer }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
