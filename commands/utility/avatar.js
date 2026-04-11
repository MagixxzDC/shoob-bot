const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get a user\'s avatar')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to get avatar from')
        .setRequired(false)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const avatarURL = user.displayAvatarURL({ size: 1024 });

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle(`${user.username}'s Avatar`)
      .setImage(avatarURL)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
