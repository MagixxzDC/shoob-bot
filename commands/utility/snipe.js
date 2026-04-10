const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('Show the last deleted message in this channel'),

  async execute(interaction) {
    const sniped = interaction.client.snipedMessages.get(interaction.channel.id);

    if (!sniped) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ No Sniped Message')
        .setDescription('There is no recently deleted message to snipe in this channel.');

      return interaction.reply({ embeds: [embed] });
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

    await interaction.reply({ embeds: [embed] });
  },
};