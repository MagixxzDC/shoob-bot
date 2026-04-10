const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  async execute(message, args, client) {
    if (!message.guild) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Server Only Command')
        .setDescription('This command can only be used inside a server.');
      return message.reply({ embeds: [embed] });
    }

    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Insufficient Permissions')
        .setDescription('You need the **Kick Members** permission.');
      return message.reply({ embeds: [embed] });
    }

    const user = message.mentions.users.first();
    if (!user) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ User Not Found')
        .setDescription('Please mention a user to kick.');
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

    const reason = args.slice(1).join(' ') || 'No reason provided';

    if (!member.kickable) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('I cannot kick this user (insufficient permissions or user has higher role).');
      return message.reply({ embeds: [embed] });
    }

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('👢 User Kicked')
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
