const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'roleinfo',
  description: 'Get role information',
  async execute(message, args, client) {
    if (!message.guild) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Server Only Command')
        .setDescription('This command can only be used inside a server.');
      return message.reply({ embeds: [embed] });
    }

    const role = message.mentions.roles.first();
    if (!role) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Role Not Found')
        .setDescription('Usage: `-roleinfo @role`');
      return message.reply({ embeds: [embed] });
    }

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

    message.reply({ embeds: [embed] });
  },
};
