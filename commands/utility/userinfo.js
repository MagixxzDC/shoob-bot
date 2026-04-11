const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Get information about a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to get info about')
        .setRequired(false)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild ? await interaction.guild.members.fetch(user.id).catch(() => null) : null;

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('👤 User Information')
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: 'Username', value: `${user.username}#${user.discriminator}`, inline: true },
        { name: 'User ID', value: `\`${user.id}\``, inline: true },
        { name: 'Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:f>` },
        { name: 'Server Join Date', value: member?.joinedTimestamp ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:f>` : 'N/A' },
        { name: 'Bot', value: user.bot ? 'Yes' : 'No', inline: true },
        { name: 'Roles', value: member ? member.roles?.cache?.filter(role => role.id !== interaction.guild?.id)?.map(r => r.toString())?.join(', ') || 'None' : 'N/A' }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
