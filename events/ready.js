module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`\n✓ Bot is online as ${client.user.tag}`);
    console.log(`\n✓ Bot is in ${client.guilds.cache.size} server(s)`);
    client.user.setActivity('/help', { type: 'LISTENING' });
  },
};
