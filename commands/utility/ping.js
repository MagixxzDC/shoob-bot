const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot latency'),

  async execute(interaction, client) {

    const sent = await interaction.reply({
      content: 'Pinging...',
      fetchReply: true
    });

    const botLatency = sent.createdTimestamp - interaction.createdTimestamp;

    const apiLatency =
      client?.ws?.ping !== undefined && client.ws.ping >= 0
        ? client.ws.ping
        : -1;

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('📡 Ping')
      .addFields(
        { name: 'Bot Latency', value: `${botLatency}ms`, inline: true },
        { name: 'API Latency', value: `${apiLatency}ms`, inline: true }
      )
      .setTimestamp();

    await interaction.editReply({
      content: '',
      embeds: [embed]
    });
  },
};