const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'timeout',
  description: 'Timeout a user',
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
        .setDescription('Usage: `-timeout @user <duration>s/m/h/d` (e.g., `-timeout @user 10m`)');
      return message.reply({ embeds: [embed] });
    }

    const durationStr = args[1];
    if (!durationStr) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Duration Required')
        .setDescription('Usage: `-timeout @user <duration>s/m/h/d`');
      return message.reply({ embeds: [embed] });
    }

    const unit = durationStr.slice(-1);
    const amount = parseInt(durationStr.slice(0, -1));
    let ms = 0;

    switch (unit) {
      case 's': ms = amount * 1000; break;
      case 'm': ms = amount * 60 * 1000; break;
      case 'h': ms = amount * 60 * 60 * 1000; break;
      case 'd': ms = amount * 24 * 60 * 60 * 1000; break;
      default:
        const embed = new EmbedBuilder()
          .setColor('#141414')
          .setTitle('❌ Invalid Duration')
          .setDescription('Use s (seconds), m (minutes), h (hours), or d (days).');
        return message.reply({ embeds: [embed] });
    }

    const member = await message.guild.members.fetch(user.id).catch(() => null);
    if (!member) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ User Not Found')
        .setDescription('User not found in this server.');
      return message.reply({ embeds: [embed] });
    }

    const reason = args.slice(2).join(' ') || 'No reason provided';

    await member.timeout(ms, reason);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('⏱️ User Timed Out')
      .addFields(
        { name: 'User', value: user.toString() },
        { name: 'Duration', value: durationStr },
        { name: 'Reason', value: reason },
        { name: 'Moderator', value: message.author.toString() }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
