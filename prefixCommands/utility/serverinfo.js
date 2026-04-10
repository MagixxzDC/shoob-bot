const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: 'Get server information',
  async execute(message, args, client) {
    if (!message.guild) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Server Only Command')
        .setDescription('This command can only be used inside a server.');
      return message.reply({ embeds: [embed] });
    }

    const guild = message.guild;

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('📊 Server Information')
      .setThumbnail(guild.iconURL({ size: 256 }))
      .addFields(
        { name: 'Server Name', value: guild.name, inline: true },
        { name: 'Server ID', value: `\`${guild.id}\``, inline: true },
        { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: 'Members', value: `${guild.memberCount}`, inline: true },
        { name: 'Roles', value: `${guild.roles?.cache?.size || 'N/A'}`, inline: true },
        { name: 'Channels', value: `${guild.channels?.cache?.size || 'N/A'}`, inline: true },
        { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:f>` },
        { name: 'Boost Level', value: `${guild.premiumTier}`, inline: true },
        { name: 'Boosts', value: `${guild.premiumSubscriptionCount}`, inline: true }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
