const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roleinfo')
    .setDescription('Get information about a role')
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('Role to get info about')
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

    const role = interaction.options.getRole('role');

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('👑 Role Information')
      .addFields(
        { name: 'Role Name', value: role.name, inline: true },
        { name: 'Role ID', value: `\`${role.id}\``, inline: true },
        { name: 'Color', value: role.color ? `#${role.color.toString(16).toUpperCase().padStart(6, '0')}` : 'None', inline: true },
        { name: 'Created', value: `<t:${Math.floor(role.createdTimestamp / 1000)}:f>` },
        { name: 'Members', value: role.members?.cache?.size?.toString() || 'N/A' },
        { name: 'Mentionable', value: role.mentionable ? 'Yes' : 'No', inline: true },
        { name: 'Hoisted', value: role.hoist ? 'Yes' : 'No', inline: true },
        { name: 'Managed', value: role.managed ? 'Yes' : 'No', inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
