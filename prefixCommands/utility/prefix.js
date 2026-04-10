const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'prefix',
  description: 'Show or set the bot prefix',
  async execute(message, args, client) {
    if (!args[0]) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('⚙️ Prefix')
        .setDescription(`Current prefix: **${client.prefix}**`)
        .setTimestamp();
      return message.reply({ embeds: [embed] });
    }

    // In a real bot, you'd save this to a database
    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('⚙️ Prefix')
      .setDescription('Prefix can only be changed by the bot owner in this version.');

    message.reply({ embeds: [embed] });
  },
};
