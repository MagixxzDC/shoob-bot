const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a user from the server',
  async execute(message, args, client) {
    if (!message.guild) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Server Only Command')
        .setDescription('This command can only be used inside a server.');
      return message.reply({ embeds: [embed] });
    }

    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Insufficient Permissions')
        .setDescription('You need the **Ban Members** permission.');
      return message.reply({ embeds: [embed] });
    }

    const user = message.mentions.users.first();
    if (!user) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ User Not Found')
        .setDescription('Please mention a user to ban.');
      return message.reply({ embeds: [embed] });
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    const member = await message.guild.members.fetch(user.id).catch(() => null);

    if (member && !member.bannable) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('I cannot ban this user (insufficient permissions or user has higher role).');
      return message.reply({ embeds: [embed] });
    }

    await message.guild.members.ban(user, { reason });

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🚫 User Banned')
      .addFields(
        { name: 'User', value: `${user} (${user.id})` },
        { name: 'Reason', value: reason },
        { name: 'Moderator', value: message.author.toString() }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
