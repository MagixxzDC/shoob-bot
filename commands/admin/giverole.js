const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giverole')
    .setDescription('Give a role to a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to give role to')
        .setRequired(true)
    )
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('Role to give')
        .setRequired(true)
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
    const role = interaction.options.getRole('role');
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({
        content: '❌ User not found in this server.',
        ephemeral: true,
      });
    }

    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({
        content: '❌ I do not have permission to manage roles.',
        ephemeral: true,
      });
    }

    if (member.roles.cache.has(role.id)) {
      return interaction.reply({
        content: '❌ That user already has this role.',
        ephemeral: true,
      });
    }

    await member.roles.add(role);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('✅ Role Added')
      .addFields(
        { name: 'User', value: user.toString() },
        { name: 'Role', value: role.toString() },
        { name: 'Moderator', value: interaction.user.toString() }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
