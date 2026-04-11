const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, AuditLogEvent } = require('discord.js');
const { getWarnings } = require('../../utils/moderationLogs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('modlogs')
    .setDescription('View moderation logs')
    .addSubcommand(subcommand =>
      subcommand
        .setName('bans')
        .setDescription('View the current server bans')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('mutes')
        .setDescription('View active timeouts / mutes')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('kicks')
        .setDescription('View recent kicks from audit logs')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('warns')
        .setDescription('View saved warnings')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('Filter warnings by user')
            .setRequired(false)
        )
    )
    .setDMPermission(true),

  async execute(interaction) {
    if (!interaction.guild) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#141414')
            .setTitle('❌ Server Only Command')
            .setDescription('This command can only be used inside a server.')
        ],
        ephemeral: true,
      });
    }

    const subcommand = interaction.options.getSubcommand();

    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerationModeration)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#141414')
            .setTitle('❌ Insufficient Permissions')
            .setDescription('You need moderation permissions to view moderation logs.')
        ],
        ephemeral: true,
      });
    }

    if (subcommand === 'bans') {
      const bans = await interaction.guild.bans.fetch();

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('🚫 Server Bans')
        .setDescription(bans.size ? `Showing up to 10 banned users (${bans.size} total)` : 'No users are currently banned.');

      if (bans.size) {
        embed.addFields(
          bans.map((ban, index) => ({
            name: `${index + 1}. ${ban.user.tag}`,
            value: `ID: ${ban.user.id}
Reason: ${ban.reason || 'No reason provided'}`,
            inline: false,
          })).slice(0, 10)
        );
      }

      return interaction.reply({ embeds: [embed] });
    }

    if (subcommand === 'mutes') {
      await interaction.guild.members.fetch();
      const mutedMembers = interaction.guild.members.cache
        .filter(member => member.communicationDisabledUntilTimestamp && member.communicationDisabledUntilTimestamp > Date.now());

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('🔇 Active Mutes / Timeouts')
        .setDescription(mutedMembers.size ? `Showing up to 10 active timeouts (${mutedMembers.size} total)` : 'No members are currently timed out.');

      if (mutedMembers.size) {
        embed.addFields(
          mutedMembers.map((member, index) => ({
            name: `${index + 1}. ${member.user.tag}`,
            value: `ID: ${member.id}
Ends: <t:${Math.floor(member.communicationDisabledUntilTimestamp / 1000)}:R>`,
            inline: false,
          })).slice(0, 10)
        );
      }

      return interaction.reply({ embeds: [embed] });
    }

    if (subcommand === 'kicks') {
      if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#141414')
              .setTitle('❌ Missing Permission')
              .setDescription('The bot needs the View Audit Log permission to show kick logs.')
          ],
          ephemeral: true,
        });
      }

      const auditLogs = await interaction.guild.fetchAuditLogs({ type: AuditLogEvent.MemberKick, limit: 10 });
      const entries = [...auditLogs.entries.values()];

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('👢 Recent Kicks')
        .setDescription(entries.length ? `Showing up to ${entries.length} recent kicks` : 'No recent kicks found.');

      if (entries.length) {
        embed.addFields(
          entries.map((entry, index) => ({
            name: `${index + 1}. ${entry.target.tag}`,
            value: `Moderator: ${entry.executor?.tag || 'Unknown'}
Reason: ${entry.reason || 'No reason provided'}
When: <t:${Math.floor(entry.createdTimestamp / 1000)}:R>`,
            inline: false,
          }))
        );
      }

      return interaction.reply({ embeds: [embed] });
    }

    if (subcommand === 'warns') {
      const user = interaction.options.getUser('user');
      const warnings = getWarnings(interaction.guild.id, user?.id);

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('⚠️ Saved Warnings')
        .setDescription(warnings.length ? `Showing up to 10 warnings${user ? ` for ${user.tag}` : ''}` : 'No saved warnings found.');

      if (warnings.length) {
        embed.addFields(
          warnings.slice(0, 10).map((warn, index) => ({
            name: `${index + 1}. ${warn.userTag}`,
            value: `Moderator: ${warn.moderatorTag}
Reason: ${warn.reason}
When: <t:${Math.floor(new Date(warn.timestamp).getTime() / 1000)}:R>`,
            inline: false,
          }))
        );
      }

      return interaction.reply({ embeds: [embed] });
    }
  },
};
