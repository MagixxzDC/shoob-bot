const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'purge',
  description: 'Delete multiple messages',
  async execute(message, args, client) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Insufficient Permissions')
        .setDescription('You need the **Manage Messages** permission.');
      return message.reply({ embeds: [embed] });
    }

    const amount = parseInt(args[0]);
    if (!amount || amount < 1 || amount > 100) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ Invalid Amount')
        .setDescription('Please provide a number between 1 and 100.');
      return message.reply({ embeds: [embed] });
    }

    const deleted = await message.channel.bulkDelete(amount + 1, true);

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🗑️ Messages Deleted')
      .setDescription(`Deleted **${deleted.size - 1}** message(s).`)
      .setTimestamp();

    const reply = await message.channel.send({ embeds: [embed] });
    setTimeout(() => reply.delete(), 5000);
  },
};
