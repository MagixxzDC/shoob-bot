const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

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

    if (!member) {
      return interaction.reply({
        content: '❌ User not found in this server.',
        flags: 64,
      });
    }

    if (!member.kickable) {
      return interaction.reply({
        content: '❌ I cannot kick this user (insufficient permissions or user has higher role).',
        flags: 64,
      });
    }

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('👢 User Kicked')
      .addFields(
        { name: 'User', value: `${user} (${user.id})` },
        { name: 'Reason', value: reason },
        { name: 'Moderator', value: interaction.user.toString() }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
