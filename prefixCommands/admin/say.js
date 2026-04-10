const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'say',
  description: 'Make the bot say something',
  async execute(message, args, client) {
    if (!args.length) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('Usage: `-say <text>`');
      return message.reply({ embeds: [embed] });
    }

    const text = args.join(' ');
    await message.delete();
    message.channel.send(text);
  },
};
