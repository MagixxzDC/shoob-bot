const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tempmute')
    .setDescription('Temporarily mute a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to tempmute')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('duration')
        .setDescription('Duration (e.g., 1h, 30m, 1d)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for tempmute')
        .setRequired(false)
    )
    .setDMPermission(true),

  async execute(interaction) {
    if (!interaction.guild) {
      return interaction.reply({ content: 'This command can only be used inside a server.', ephemeral: true });
    }

    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Permission Denied')
        .setDescription('You need the `Moderate Members` permission to use this command.');

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const user = interaction.options.getUser('user');
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ User Not Found')
        .setDescription('That user is not in this server.');

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (member.id === interaction.user.id) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid Target')
        .setDescription('You cannot tempmute yourself.');

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Permission Denied')
        .setDescription('You cannot tempmute someone with a higher or equal role.');

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const durationMs = ms(duration);
    if (!durationMs || durationMs < 1000 || durationMs > 2419200000) { // 1 second to 28 days
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid Duration')
        .setDescription('Please provide a valid duration (1s to 28d).');

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {
      await member.timeout(durationMs, reason);

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('✅ User Temporarily Muted')
        .setDescription(`${user.tag} has been muted for ${ms(durationMs, { long: true })}.\n**Reason:** ${reason}`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('An error occurred while trying to tempmute the user.');

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};