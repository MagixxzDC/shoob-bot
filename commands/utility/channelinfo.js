const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channelinfo')
    .setDescription('Get information about a channel')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel to get info about')
        .setRequired(false)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel') || interaction.channel;

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

    await interaction.reply({ embeds: [embed] });
  },
};