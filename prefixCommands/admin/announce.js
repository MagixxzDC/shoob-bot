const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'announce',
  description: 'Send an announcement',
  async execute(message, args, client) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Insufficient Permissions')
        .setDescription('You need the **Manage Messages** permission.');
      return message.reply({ embeds: [embed] });
    }

    const text = args.join(' ');
    if (!text) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('Usage: `-announce <text>`');
      return message.reply({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('📢 Announcement')
      .setDescription(text)
      .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
    await message.delete();
  },
};
