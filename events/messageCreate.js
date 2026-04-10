const { EmbedBuilder } = require('discord.js');
const { Collection } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    // Ignore bot messages
    if (message.author.bot) return;

    // Make sure DM channel data is available when using partial channels
    if (message.channel?.partial) {
      await message.channel.fetch().catch(() => null);
    }

    // Check if message starts with prefix
    if (!message.content.startsWith(client.prefix)) return;

    // Extract command and arguments
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Get the command
    const command = client.prefixCommands.get(commandName);

    if (!command) return;

    // Cooldown system
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const defaultCooldownSeconds = 3;
    const cooldownAmount = (command.cooldown || defaultCooldownSeconds) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        return message.reply({
          content: `⏱️ Please wait, you are on cooldown for \`${command.name}\`. Try again <t:${expiredTimestamp}:R>`,
        });
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Execute command
    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      const errorEmbed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('❌ An error occurred')
        .setDescription('Something went wrong while executing this command.');

      await message.reply({ embeds: [errorEmbed] });
    }
  },
};
