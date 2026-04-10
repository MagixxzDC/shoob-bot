const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Get a user avatar',
  async execute(message, args, client) {
    const user = message.mentions.users.first() || message.author;
    const avatarURL = user.displayAvatarURL({ size: 1024 });

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle(`${user.username}'s Avatar`)
      .setImage(avatarURL)
      .addFields(
        { name: 'User', value: user.toString() },
        { name: 'Download', value: `[PNG](${avatarURL}?size=4096)` }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
