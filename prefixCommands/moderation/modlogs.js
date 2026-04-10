const { EmbedBuilder, PermissionFlagsBits, AuditLogEvent } = require('discord.js');
const { getWarnings } = require('../../utils/moderationLogs');

module.exports = {
  name: 'modlogs',
  description: 'View moderation logs',
  async execute(message, args, client) {
    if (!message.guild) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Server Only Command')
        .setDescription('This command can only be used inside a server.');
      return message.reply({ embeds: [embed] });
    }

    if (!message.member.permissions.has(PermissionFlagsBits.ModerationModeration)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Insufficient Permissions')
        .setDescription('You need moderation permissions to view moderation logs.');
      return message.reply({ embeds: [embed] });
    }

    const subcommand = args[0]?.toLowerCase();
    if (!subcommand) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('📚 Modlogs Usage')
        .setDescription('Use `-modlogs bans`, `-modlogs mutes`, `-modlogs kicks`, or `-modlogs warns [@user]`.');
      return message.reply({ embeds: [embed] });
    }

    if (subcommand === 'bans') {
      const bans = await message.guild.bans.fetch();
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('🚫 Server Bans')
        .setDescription(bans.size ? `Showing up to 10 banned users (${bans.size} total)` : 'No users are currently banned.');

      if (bans.size) {
        embed.addFields(
          bans.map((ban, index) => ({
            name: `${index + 1}. ${ban.user.tag}`,
            value: `ID: ${ban.user.id}\nReason: ${ban.reason || 'No reason provided'}`,
            inline: false,
          })).slice(0, 10)
        );
      }

      return message.reply({ embeds: [embed] });
    }

    if (subcommand === 'mutes') {
      await message.guild.members.fetch();
      const mutedMembers = message.guild.members.cache
        .filter(member => member.communicationDisabledUntilTimestamp && member.communicationDisabledUntilTimestamp > Date.now());

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('🔇 Active Mutes / Timeouts')
        .setDescription(mutedMembers.size ? `Showing up to 10 active timeouts (${mutedMembers.size} total)` : 'No members are currently timed out.');

      if (mutedMembers.size) {
        embed.addFields(
          mutedMembers.map((member, index) => ({
            name: `${index + 1}. ${member.user.tag}`,
            value: `ID: ${member.id}\nEnds: <t:${Math.floor(member.communicationDisabledUntilTimestamp / 1000)}:R>`,
            inline: false,
          })).slice(0, 10)
        );
      }

      return message.reply({ embeds: [embed] });
    }

    if (subcommand === 'kicks') {
      if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
        const embed = new EmbedBuilder()
          .setColor('#141414')
          .setTitle('❌ Missing Permission')
          .setDescription('The bot needs the View Audit Log permission to show kick logs.');
        return message.reply({ embeds: [embed] });
      }

      const auditLogs = await message.guild.fetchAuditLogs({ type: AuditLogEvent.MemberKick, limit: 10 });
      const entries = [...auditLogs.entries.values()];

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('👢 Recent Kicks')
        .setDescription(entries.length ? `Showing up to ${entries.length} recent kicks` : 'No recent kicks found.');

      if (entries.length) {
        embed.addFields(
          entries.map((entry, index) => ({
            name: `${index + 1}. ${entry.target.tag}`,
            value: `Moderator: ${entry.executor?.tag || 'Unknown'}\nReason: ${entry.reason || 'No reason provided'}\nWhen: <t:${Math.floor(entry.createdTimestamp / 1000)}:R>`,
            inline: false,
          }))
        );
      }

      return message.reply({ embeds: [embed] });
    }

    if (subcommand === 'warns') {
      const user = message.mentions.users.first();
      const warnings = getWarnings(message.guild.id, user?.id);

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('⚠️ Saved Warnings')
        .setDescription(warnings.length ? `Showing up to 10 warnings${user ? ` for ${user.tag}` : ''}` : 'No saved warnings found.');

      if (warnings.length) {
        embed.addFields(
          warnings.slice(0, 10).map((warn, index) => ({
            name: `${index + 1}. ${warn.userTag}`,
            value: `Moderator: ${warn.moderatorTag}\nReason: ${warn.reason}\nWhen: <t:${Math.floor(new Date(warn.timestamp).getTime() / 1000)}:R>`,
            inline: false,
          }))
        );
      }

      return message.reply({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('❌ Invalid Modlogs Command')
      .setDescription('Use `-modlogs bans`, `-modlogs mutes`, `-modlogs kicks`, or `-modlogs warns [@user]`.');

    return message.reply({ embeds: [embed] });
  },
};
