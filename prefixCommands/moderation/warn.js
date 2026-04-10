const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { addWarning } = require('../../utils/moderationLogs');

module.exports = {
  name: 'warn',
  description: 'Warn a user',

  async execute(message, args, client) {
    try {
      if (!message?.guild) {
        return message?.reply?.('This command only works in servers.');
      }

      if (!message.member?.permissions?.has(PermissionFlagsBits.ModerateMembers)) {
        return message.reply('You do not have permission to use this command.');
      }

      const userId = args?.[0];
      if (!userId) {
        return message.reply('Usage: -warn <userId> [reason]');
      }

      // SAFE MEMBER FETCH
      let member = null;
      try {
        member = await message.guild.members.fetch(userId);
      } catch {
        return message.reply('User not found in this server.');
      }

      // SAFE REASON
      const reasonRaw = args.slice(1).join(' ');
      const reason = reasonRaw?.trim()?.length
        ? reasonRaw.trim()
        : 'No reason provided';

      // SAFE VALUES (NO UNDEFINED EVER)
      const userTag = member?.user?.tag || 'Unknown User';
      const userIdSafe = member?.id || userId;
      const modTag = message?.author?.tag || 'Terminal User';

      const avatar = member?.user?.displayAvatarURL?.() || null;

      // MAIN EMBED (SAFE GUARANTEED STRINGS)
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('⚠️ User Warned')
        .addFields(
          {
            name: 'User',
            value: `${userTag} (${userIdSafe})`
          },
          {
            name: 'Reason',
            value: String(reason)
          },
          {
            name: 'Moderator',
            value: String(modTag)
          }
        )
        .setThumbnail(avatar)
        .setTimestamp();

      // DM USER (SAFE)
      try {
        await member.user.send({
          embeds: [
            new EmbedBuilder()
              .setColor('#141414')
              .setTitle('⚠️ You have been warned')
              .addFields(
                {
                  name: 'Server',
                  value: message.guild.name || 'Unknown Server'
                },
                {
                  name: 'Reason',
                  value: String(reason)
                }
              )
              .setTimestamp()
          ]
        });
      } catch {
        // ignore DM failure
      }

      // LOG WARNING (SAFE INPUT ONLY)
      try {
        addWarning(message.guild.id, member.user, message.author, reason);
      } catch (err) {
        console.error('Warning log failed:', err);
      }

      return message.reply({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      return message.reply('Something went wrong while executing the warn command.');
    }
  }
};