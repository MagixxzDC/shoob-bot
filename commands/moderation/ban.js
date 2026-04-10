const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false)
    )
    .addIntegerOption(option =>
      option
        .setName('days')
        .setDescription('Delete messages from last X days (0-7)')
        .setMinValue(0)
        .setMaxValue(7)
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    if (!interaction.guild) {
      return interaction.reply({
        content: '❌ This command can only be used inside a server.',
        flags: 64,
      });
    }

    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(user.id);
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const days = interaction.options.getInteger('days') || 0;

    if (member && !member.bannable) {
      return interaction.reply({
        content: '❌ I cannot ban this user (insufficient permissions or user has higher role).',
        flags: 64,
      });
    }

    await interaction.guild.members.ban(user, { reason, deleteMessageSeconds: days * 86400 });

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🚫 User Banned')
      .addFields(
        { name: 'User', value: `${user} (${user.id})` },
        { name: 'Reason', value: reason },
        { name: 'Messages Deleted', value: `Last ${days} days` },
        { name: 'Moderator', value: interaction.user.toString() }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
