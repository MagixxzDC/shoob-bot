const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calculator')
    .setDescription('Calculate a math expression')
    .addStringOption(option =>
      option
        .setName('expression')
        .setDescription('Math expression to calculate')
        .setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const expression = interaction.options.getString('expression');

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

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Calculation Error')
        .setDescription('Invalid math expression. Use only numbers and basic operators (+, -, *, /, ()).');

      await interaction.reply({ embeds: [errorEmbed] });
    }
  },
};