const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'softban',
  description: 'Softban a user (ban and immediately unban to remove messages)',
  usage: '-softban <user> [reason]',
  category: 'moderation',
  cooldown: 3000,

  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Permission Denied')
        .setDescription('You need the `Ban Members` permission to use this command.');

      return message.reply({ embeds: [embed] });
    }

    if (!args.length) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Missing Arguments')
        .setDescription('Please mention a user to softban.\nUsage: `-softban <user> [reason]`');

      return message.reply({ embeds: [embed] });
    }

    const user = message.mentions.users.first();
    if (!user) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid User')
        .setDescription('Please mention a valid user.');

      return message.reply({ embeds: [embed] });
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ User Not Found')
        .setDescription('That user is not in this server.');

      return message.reply({ embeds: [embed] });
    }

    if (member.id === message.author.id) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid Target')
        .setDescription('You cannot softban yourself.');

      return message.reply({ embeds: [embed] });
    }

    if (member.roles.highest.position >= message.member.roles.highest.position) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Permission Denied')
        .setDescription('You cannot softban someone with a higher or equal role.');

      return message.reply({ embeds: [embed] });
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      await member.ban({ reason: `Softban: ${reason}` });
      await message.guild.members.unban(user.id, 'Softban removal');

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('✅ User Softbanned')
        .setDescription(`${user.tag} has been softbanned.\n**Reason:** ${reason}`)
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('An error occurred while trying to softban the user.');

      await message.reply({ embeds: [embed] });
    }
  },
};