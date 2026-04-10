module.exports = {
  name: 'send',
  description: 'Send a message to a user\'s DMs',
  async execute(message, args, client) {
    if (args.length < 2) {
      return message.reply('Usage: `-send <user> <message>`');
    }

    const userMention = args[0];
    const userId = userMention.replace(/[<@!>]/g, '');
    const user = await client.users.fetch(userId).catch(() => null);

    if (!user) {
      return message.reply('User not found.');
    }

    const msg = args.slice(1).join(' ');

    try {
      await user.send(msg);
      await message.reply(`Message sent to ${user.username}!`);
    } catch (error) {
      console.error(error);
      await message.reply('Failed to send the message. The user might have DMs disabled.');
    }
  },
};