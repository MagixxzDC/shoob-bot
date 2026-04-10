const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',

  async execute(message, args, client) {

    const start = Date.now();

    // terminal + discord safe reply (NO RETURN EXPECTED)
    await message.reply('Pinging...');

    const latency = Date.now() - start;
    const apiLatency = client?.ws?.ping ?? 'N/A';

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('📡 Ping')
      .addFields(
        { name: 'Bot Latency', value: `${latency}ms`, inline: true },
        { name: 'API Latency', value: `${apiLatency}ms`, inline: true }
      )
      .setTimestamp();

    // second reply ONLY (no edit, no chaining)
    return message.reply({ embeds: [embed] });
  },
};