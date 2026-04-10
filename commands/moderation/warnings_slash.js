const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { getWarnings } = require('../../utils/moderationLogs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('View warnings for a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to check warnings for')
        .setRequired(false)
    ),

  async execute(interaction, client) {
    try {
      if (!interaction.guild) {
        return interaction.reply({ content: 'Server only command.', ephemeral: true });
      }

      if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
        return interaction.reply({ content: 'No permission.', ephemeral: true });
      }

      const user = interaction.options.getUser('user') || interaction.user;

      const warnings = getWarnings(interaction.guild.id, user.id) || [];

      const formatted =
        warnings.length > 0
          ? warnings
              .slice(-10)
              .map((w, i) => `**${i + 1}.** ${w.reason || 'No reason'}`)
              .join('\n')
          : 'No warnings found.';

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('📄 Warnings')
        .setDescription(formatted)
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });

    } catch (err) {
      console.error('warnings slash command error:', err);

      if (!interaction.replied) {
        return interaction.reply({
          content: 'Error fetching warnings.',
          ephemeral: true,
        });
      }
    }
  },
};