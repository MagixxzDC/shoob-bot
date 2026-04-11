const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const triviaQuestions = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'What is 2 + 2?', answer: '4' },
  { question: 'What color is the sky on a clear day?', answer: 'Blue' },
  { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
  { question: 'What is the chemical symbol for water?', answer: 'H2O' },
  { question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci' },
  { question: 'What is the smallest country in the world?', answer: 'Vatican City' },
  { question: 'What is the currency of Japan?', answer: 'Yen' },
  { question: 'What is the highest mountain in the world?', answer: 'Mount Everest' },
  { question: 'What is the largest ocean on Earth?', answer: 'Pacific Ocean' },
  { question: 'What is the capital of Japan?', answer: 'Tokyo' },
  { question: 'What color is just before it rains?', answer: 'Gray' },
  { question: 'How many continents are there on Earth?', answer: '7' },
  { question: 'Food with a hole in the middle?', answer: 'Donut' },
  { question: 'Food that is a long cylinder?', answer: 'Hot Dog' },
  { question: 'What is turmeric?', answer: 'A spice', answer: 'spice' },
  { question: 'What is the name of my second pet?', answer: 'Rocko' }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Play a trivia game')
    .setDMPermission(true),

  async execute(interaction) {
    const question = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🧠 Trivia Question')
      .setDescription(`**${question.question}**\n\nReply with your answer!`)
      .setFooter({ text: 'You have 30 seconds to answer' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

    const filter = (m) => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, time: 30000, max: 1 });

    collector.on('collect', (message) => {
      const userAnswer = message.content.toLowerCase();
      const correctAnswer = question.answer.toLowerCase();

      if (userAnswer === correctAnswer) {
        const winEmbed = new EmbedBuilder()
          .setColor('#141414')
          .setTitle('✅ Correct!')
          .setDescription(`The answer was **${question.answer}**!\n\nYou got it right! 🎉`);

        interaction.followUp({ embeds: [winEmbed] });
      } else {
        const loseEmbed = new EmbedBuilder()
          .setColor('#141414')
          .setTitle('❌ Wrong!')
          .setDescription(`The correct answer was **${question.answer}**.\n\nBetter luck next time!`);

        interaction.followUp({ embeds: [loseEmbed] });
      }
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        const timeoutEmbed = new EmbedBuilder()
          .setColor('#141414')
          .setTitle('⏰ Time\'s Up!')
          .setDescription(`The correct answer was **${question.answer}**.`);

        interaction.followUp({ embeds: [timeoutEmbed] });
      }
    });
  },
};
