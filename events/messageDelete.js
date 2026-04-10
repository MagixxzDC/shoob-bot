module.exports = {
  name: 'messageDelete',
  async execute(message, client) {
    if (message.author?.bot) return;

    client.snipedMessages.set(message.channel.id, {
      content: message.content,
      author: message.author,
      timestamp: message.createdTimestamp,
      attachments: message.attachments.map(a => a.url)
    });
  },
};