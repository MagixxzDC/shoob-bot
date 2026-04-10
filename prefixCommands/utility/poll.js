const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'poll',
  description: 'Create a poll',
  async execute(message, args, client) {
    const question = args.shift();
    if (!question) return message.reply('Please provide a question!');

    const options = args;
    if (options.length < 2) return message.reply('Please provide at least 2 options!');

    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    let description = '';
    options.forEach((option, index) => {
      description += `${emojis[index]} ${option}\n`;
    });

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('📊 Poll')
      .setDescription(`**${question}**\n\n${description}`)
      .setFooter({ text: `Poll by ${message.author.username}` })
      .setTimestamp();

    const pollMessage = await message.reply({ embeds: [embed] });

    for (let i = 0; i < Math.min(options.length, emojis.length); i++) {
      await pollMessage.react(emojis[i]);
    }
  },
};