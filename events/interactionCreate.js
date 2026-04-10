const { EmbedBuilder, Collection } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    // Handle slash commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`Command ${interaction.commandName} not found`);
        return;
      }

      // Cooldown system
      if (!client.cooldowns.has(command.data.name)) {
        client.cooldowns.set(command.data.name, new Collection());
      }

      const now = Date.now();
      const timestamps = client.cooldowns.get(command.data.name);
      const defaultCooldownSeconds = 3;
      const cooldownAmount = (command.cooldown || defaultCooldownSeconds) * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1000);
          return interaction.reply({
            content: `⏱️ Please wait, you are on cooldown for \`${command.data.name}\`. Try again <t:${expiredTimestamp}:R>`,
            flags: 64,
          });
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        const errorEmbed = new EmbedBuilder()
          .setColor('#141414')
          .setTitle('❌ An error occurred')
          .setDescription('Something went wrong while executing this command.');

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ embeds: [errorEmbed], flags: 64 });
        } else {
          await interaction.reply({ embeds: [errorEmbed], flags: 64 });
        }
      }
    }

    // Handle button interactions
    if (interaction.isButton()) {
      // Custom button handler logic can be added here
    }

    // Handle select menus
    if (interaction.isStringSelectMenu()) {
      // Custom select menu handler logic can be added here
    }
  },
};
