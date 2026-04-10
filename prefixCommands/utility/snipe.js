const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'snipe',
  description: 'Show the last deleted message in this channel',
  async execute(message, args, client) {
    const sniped = client.snipedMessages.get(message.channel.id);

    if (!sniped) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ No Sniped Message')
        .setDescription('There is no recently deleted message to snipe in this channel.');

      return message.reply({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🔍 Sniped Message')
      .setDescription(sniped.content || '*No text content*')
      .setAuthor({ name: sniped.author.username, iconURL: sniped.author.displayAvatarURL() })
      .setTimestamp(sniped.timestamp);

    if (sniped.attachments.length > 0) {
      embed.setImage(sniped.attachments[0]);
    }

    message.reply({ embeds: [embed] });
  },
};