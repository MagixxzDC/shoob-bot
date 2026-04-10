const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'slowmode',
  description: 'Set channel slowmode',
  async execute(message, args, client) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Insufficient Permissions')
        .setDescription('You need the **Manage Messages** permission.');
      return message.reply({ embeds: [embed] });
    }

    const seconds = parseInt(args[0]) || 0;

    if (seconds < 0 || seconds > 21600) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid Duration')
        .setDescription('Slowmode must be between 0 and 21600 seconds (0 to disable).');
      return message.reply({ embeds: [embed] });
    }

    await message.channel.setRateLimitPerUser(seconds);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('⏱️ Slowmode Set')
      .setDescription(seconds === 0 ? 'Slowmode disabled' : `Slowmode set to **${seconds}** seconds`)
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
