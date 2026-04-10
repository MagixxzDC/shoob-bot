const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('takerole')
    .setDescription('Remove a role from a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to remove role from')
        .setRequired(true)
    )
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('Role to remove')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    if (!interaction.guild) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#141414')
            .setTitle('❌ Server Only Command')
            .setDescription('This command can only be used inside a server.')
        ],
        flags: 64,
      });
    }

    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({
        content: '❌ User not found in this server.',
        flags: 64,
      });
    }

    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({
        content: '❌ I do not have permission to manage roles.',
        flags: 64,
      });
    }

    if (!member.roles.cache.has(role.id)) {
      return interaction.reply({
        content: '❌ That user does not have this role.',
        flags: 64,
      });
    }

    await member.roles.remove(role);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('✅ Role Removed')
      .addFields(
        { name: 'User', value: user.toString() },
        { name: 'Role', value: role.toString() },
        { name: 'Moderator', value: interaction.user.toString() }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
