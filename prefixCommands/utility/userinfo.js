const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Get user information',
  async execute(message, args, client) {
    const user = message.mentions.users.first() || message.author;
    const member = message.guild ? await message.guild.members.fetch(user.id).catch(() => null) : null;

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('👤 User Information')
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: 'Username', value: `${user.username}#${user.discriminator}`, inline: true },
        { name: 'User ID', value: `\`${user.id}\``, inline: true },
        { name: 'Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:f>` },
        { name: 'Server Join Date', value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:f>` : 'N/A' },
        { name: 'Bot', value: user.bot ? 'Yes' : 'No', inline: true },
        { name: 'Roles', value: member ? member.roles?.cache?.map(r => r.toString())?.join(', ') || 'None' : 'N/A' }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
