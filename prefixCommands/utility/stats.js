const { EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
  name: 'stats',
  description: 'Show bot stats',
  async execute(message, args, client) {
    const totalSeconds = Math.floor(client.uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('📊 Bot Statistics')
      .addFields(
        { name: 'Uptime', value: `${days}d ${hours}h ${minutes}m`, inline: true },
        { name: 'Servers', value: client.guilds?.cache?.size?.toString() || 'N/A', inline: true },
        { name: 'Users', value: client.users?.cache?.size?.toString() || 'N/A', inline: true },
        { name: 'Channels', value: client.channels?.cache?.size?.toString() || 'N/A', inline: true },
        { name: 'Ping', value: `${client.ws.ping}ms`, inline: true },
        { name: 'Prefix', value: client.prefix, inline: true },
        { name: 'Node Version', value: process.version, inline: true },
        { name: 'Memory Usage', value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, inline: true },
        { name: 'Platform', value: os.platform(), inline: true }
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
