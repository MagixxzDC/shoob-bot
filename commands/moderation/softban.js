const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('softban')
    .setDescription('Softban a user (ban and immediately unban to remove messages)')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to softban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for softban')
        .setRequired(false)
    )
    .setDMPermission(true),

  async execute(interaction) {
    if (!interaction.guild) {
      return interaction.reply({ content: 'This command can only be used inside a server.', ephemeral: true });
    }

    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Permission Denied')
        .setDescription('You need the `Ban Members` permission to use this command.');

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const user = interaction.options.getUser('user');
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
        .setDescription('You cannot softban yourself.');

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Permission Denied')
        .setDescription('You cannot softban someone with a higher or equal role.');

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {
      await member.ban({ reason: `Softban: ${reason}` });
      await interaction.guild.members.unban(user.id, 'Softban removal');

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('✅ User Softbanned')
        .setDescription(`${user.tag} has been softbanned.\n**Reason:** ${reason}`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('An error occurred while trying to softban the user.');

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};