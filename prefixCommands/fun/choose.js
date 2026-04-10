const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'choose',
  description: 'Choose between options',
  async execute(message, args, client) {
    const options = args.join(' ').split(',').map(opt => opt.trim());

    if (options.length < 2) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('Usage: `-choose<option1>, <option2>, ...`');
      return message.reply({ embeds: [embed] });
    }

    const choice = options[Math.floor(Math.random() * options.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('✨ Random Choice')
      .addFields(
        { name: 'Options', value: options.join(', ') },
        { name: 'I chose', value: `**${choice}**` }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
