const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'takerole',
  description: 'Remove a role from a user',
  async execute(message, args, client) {
    if (!message.guild) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Server Only Command')
        .setDescription('This command can only be used inside a server.');
      return message.reply({ embeds: [embed] });
    }

    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Insufficient Permissions')
        .setDescription('You need the **Manage Roles** permission.');
      return message.reply({ embeds: [embed] });
    }

    const user = message.mentions.users.first();
    const role = message.mentions.roles.first();

    if (!user || !role) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid Arguments')
        .setDescription('Usage: `-takerole @user @role`');
      return message.reply({ embeds: [embed] });
    }

    const member = await message.guild.members.fetch(user.id).catch(() => null);
    if (!member) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('User not found in this server.');
      return message.reply({ embeds: [embed] });
    }

    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('I do not have permission to manage roles.');
      return message.reply({ embeds: [embed] });
    }

    if (!member.roles.cache.has(role.id)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('That user does not have this role.');
      return message.reply({ embeds: [embed] });
    }

    await member.roles.remove(role);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('✅ Role Removed')
      .addFields(
        { name: 'User', value: user.toString() },
        { name: 'Role', value: role.toString() },
        { name: 'Moderator', value: message.author.toString() }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
