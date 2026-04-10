const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'lockdown',
  description: 'Lockdown or unlock the channel',
  async execute(message, args, client) {
    if (!message.guild) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Server Only Command')
        .setDescription('This command can only be used inside a server.');
      return message.reply({ embeds: [embed] });
    }

    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Insufficient Permissions')
        .setDescription('You need the **Manage Channels** permission.');
      return message.reply({ embeds: [embed] });
    }

    const isLocked = message.channel.permissionOverwrites.cache.some(
      perm => perm.id === message.guild.id && perm.deny.has(PermissionFlagsBits.SendMessages)
    );

    const reason = args.join(' ') || 'No reason provided';

    if (isLocked) {
      await message.channel.permissionOverwrites.edit(message.guild.id, {
        SendMessages: null,
      });

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('🔓 Channel Unlocked')
        .addFields(
          { name: 'Channel', value: message.channel.toString() },
          { name: 'Reason', value: reason }
        )
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    } else {
      await message.channel.permissionOverwrites.edit(message.guild.id, {
        SendMessages: false,
      });

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('🔒 Channel Locked')
        .addFields(
          { name: 'Channel', value: message.channel.toString() },
          { name: 'Reason', value: reason }
        )
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    }
  },
};
