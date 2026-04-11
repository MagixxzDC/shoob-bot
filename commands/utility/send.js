const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('send')
    .setDescription('Send a message to a user\'s DMs')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to send the message to')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('The message to send')
        .setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const message = interaction.options.getString('message');

    try {
      await user.send(message);
      await interaction.reply({ content: `Message sent to ${user.username}!`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Failed to send the message. The user might have DMs disabled.', ephemeral: true });
    }
  },
};