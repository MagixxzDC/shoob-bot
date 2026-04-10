const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'Unmute a user',
  async execute(message, args, client) {
    if (!message.guild) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Server Only Command')
        .setDescription('This command can only be used inside a server.');
      return message.reply({ embeds: [embed] });
    }

    if (!message.member.permissions.has(PermissionFlagsBits.ModerationModeration)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Insufficient Permissions')
        .setDescription('You need moderation permissions.');
      return message.reply({ embeds: [embed] });
    }

    const user = message.mentions.users.first();
    if (!user) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ User Not Found')
        .setDescription('Usage: `-unmute @user`');
      return message.reply({ embeds: [embed] });
    }

    const member = await message.guild.members.fetch(user.id).catch(() => null);
    if (!member) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('User not found in this server.');
      return message.reply({ embeds: [embed] });
    }

    await member.timeout(null);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🔊 User Unmuted')
      .addFields(
        { name: 'User', value: user.toString() },
        { name: 'Moderator', value: message.author.toString() }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
