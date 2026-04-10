const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'calculator',
  description: 'Calculate a math expression',
  async execute(message, args, client) {
    const expression = args.join(' ');
    if (!expression) return message.reply('Please provide a math expression!');

    try {
      // Simple eval with safety check
      if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error('Invalid characters');
      }

      const result = eval(expression);

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('🧮 Calculator')
        .addFields(
          { name: 'Expression', value: `\`\`\`${expression}\`\`\``, inline: false },
          { name: 'Result', value: `\`\`\`${result}\`\`\``, inline: false }
        )
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Calculation Error')
        .setDescription('Invalid math expression. Use only numbers and basic operators (+, -, *, /, ()).');

      message.reply({ embeds: [errorEmbed] });
    }
  },
};