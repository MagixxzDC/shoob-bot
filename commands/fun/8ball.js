const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8 ball a question')
    .addStringOption(option =>
      option
        .setName('question')
        .setDescription('Your question')
        .setRequired(true)
    ),

  async execute(interaction) {
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

    const answer = responses[Math.floor(Math.random() * responses.length)];
    const question = interaction.options.getString('question');

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🎱 Magic 8 Ball')
      .addFields(
        { name: 'Question', value: question },
        { name: 'Answer', value: answer }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
