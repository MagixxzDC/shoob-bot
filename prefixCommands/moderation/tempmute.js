const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'tempmute',
  description: 'Temporarily mute a user',
  usage: '-tempmute <user> <duration> [reason]',
  category: 'moderation',
  cooldown: 3000,

  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Permission Denied')
        .setDescription('You need the `Moderate Members` permission to use this command.');

      return message.reply({ embeds: [embed] });
    }

    if (args.length < 2) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Missing Arguments')
        .setDescription('Please mention a user and provide a duration.\nUsage: `-tempmute <user> <duration> [reason]`');

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
        .setDescription('You cannot tempmute yourself.');

      return message.reply({ embeds: [embed] });
    }

    if (member.roles.highest.position >= message.member.roles.highest.position) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Permission Denied')
        .setDescription('You cannot tempmute someone with a higher or equal role.');

      return message.reply({ embeds: [embed] });
    }

    const duration = args[1];
    const durationMs = ms(duration);
    if (!durationMs || durationMs < 1000 || durationMs > 2419200000) { // 1 second to 28 days
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid Duration')
        .setDescription('Please provide a valid duration (1s to 28d).');

      return message.reply({ embeds: [embed] });
    }

    const reason = args.slice(2).join(' ') || 'No reason provided';

    try {
      await member.timeout(durationMs, reason);

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('✅ User Temporarily Muted')
        .setDescription(`${user.tag} has been muted for ${ms(durationMs, { long: true })}.\n**Reason:** ${reason}`)
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Error')
        .setDescription('An error occurred while trying to tempmute the user.');

      await message.reply({ embeds: [embed] });
    }
  },
};