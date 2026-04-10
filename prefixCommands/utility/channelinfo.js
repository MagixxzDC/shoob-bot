const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  name: 'channelinfo',
  description: 'Get channel information',

  async execute(message, args, client) {
    const channel = message.mentions.channels.first() || message.channel;

    const channelType =
      typeof channel.type === 'string'
        ? channel.type
        : ChannelType[channel.type] ?? 'Unknown';

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('📢 Channel Information')
      .addFields(
        { name: 'Name', value: String(channel.name ?? 'Unknown'), inline: true },
        { name: 'Channel ID', value: `\`${channel.id}\``, inline: true },
        { name: 'Type', value: String(channelType), inline: true },
        {
          name: 'Created',
          value: channel.createdTimestamp
            ? `<t:${Math.floor(channel.createdTimestamp / 1000)}:f>`
            : 'Unknown',
          inline: false
        },
        {
          name: 'Topic',
          value: String(channel.topic ?? 'No topic'),
          inline: false
        },
        {
          name: 'NSFW',
          value: channel.nsfw ? 'Yes' : 'No',
          inline: true
        }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};