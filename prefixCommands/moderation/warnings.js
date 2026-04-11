const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { getWarnings } = require('../../utils/moderationLogs');

module.exports = {
  name: 'warnings',
  description: 'View warnings for a user',
  usage: '-warnings <user>',
  category: 'moderation',
  cooldown: 3000,

  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Permission Denied')
        .setDescription('You need the `Moderate Members` permission to use this command.');

      return message.reply({ embeds: [embed] });
    }

    if (!args.length) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Missing Arguments')
        .setDescription('Please mention a user or provide a user ID to check warnings for.\nUsage: `-warnings <user>`');

      return message.reply({ embeds: [embed] });
    }

    let user = message.mentions.users.first();

    if (!user) {
      const userId = args[0].replace(/[^0-9]/g, '');
      if (userId) {
        user = await message.client.users.fetch(userId).catch(() => null);
      }
    }

    if (!user) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid User')
        .setDescription('Please mention a valid user or provide a user ID.');

      return message.reply({ embeds: [embed] });
    }

    const warnings = getWarnings(message.guild.id, user.id) || [];
    const description = warnings.length
      ? warnings
          .slice(-10)
          .map((warning, index) => `**${index + 1}.** ${warning.reason || 'No reason provided'} - <@${warning.moderatorId}>`)
          .join('\n')
      : 'No warnings found.';

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle(`⚠️ Warnings for ${user.tag}`)
      .setDescription(description)
      .setFooter({ text: `Total warnings: ${warnings.length}` })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  },
};