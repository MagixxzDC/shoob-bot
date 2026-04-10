const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Tell a random joke'),

  async execute(interaction) {
    const jokes = [
      'Why don\'t scientists trust atoms? Because they make up everything!',
      'Why did the scarecrow win an award? He was outstanding in his field!',
      'I would avoid the sushi if I were you. It\'s a little fishy.',
      'What do you call a bear with no teeth? A gummy bear!',
      'Why don\'t eggs tell jokes? They\'d crack each other up!',
      'What did the ocean say to the beach? Nothing, it just waved.',
      'Why don\'t skeletons fight each other? They don\'t have the guts!',
      'What\'s the best thing about Switzerland? I don\'t know, but their flag is a big plus.',
      'I stayed up all night wondering where the sun went. Then it dawned on me.',
      'How do you organize a space party? You planet!',
      'Why did the bicycle fall over? Because it was two-tired!',
      'What do you call fake spaghetti? An impasta!',
      'Why did the math book look sad? Because it had too many problems.',
      'What do you call cheese that isn\'t yours? Nacho cheese!',
      'Why did the tomato turn red? Because it saw the salad dressing!',
      'What do you call a snowman with a six-pack? An abdominal snowman!'
    ];

    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('😂 Random Joke')
      .setDescription(joke)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
