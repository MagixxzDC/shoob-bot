const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Unban a user',
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

    const userID = args[0];
    if (!userID) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ User ID Required')
        .setDescription('Usage: `-unban <userID>`');
      return message.reply({ embeds: [embed] });
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      await message.guild.members.unban(userID, reason);

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('✅ User Unbanned')
        .addFields(
          { name: 'User ID', value: userID },
          { name: 'Reason', value: reason },
          { name: 'Moderator', value: message.author.toString() }
        )
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('User not found in ban list or invalid ID.');
      message.reply({ embeds: [embed] });
    }
  },
};
