const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { addWarning } = require('../../utils/moderationLogs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to warn')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for warning')
        .setRequired(false)
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

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('⚠️ User Warned')
      .addFields(
        { name: 'User', value: `${user} (${user.id})` },
        { name: 'Reason', value: reason },
        { name: 'Moderator', value: interaction.user.toString() }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    try {
      await user.send({
        embeds: [new EmbedBuilder()
          .setColor('#141414')
          .setTitle('⚠️ You have been warned')
          .addFields(
            { name: 'Server', value: interaction.guild.name },
            { name: 'Reason', value: reason }
          )
          .setTimestamp()]
      });
    } catch (error) {
      console.log('Could not DM user');
    }

    addWarning(interaction.guild.id, user, interaction.user, reason);
    await interaction.reply({ embeds: [embed] });
  },
};
