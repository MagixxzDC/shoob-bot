const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];
const globalCommands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      if (typeof command.data.setDMPermission === 'function') {
        command.data.setDMPermission(true);
      }

      const commandData = command.data.toJSON();
      commands.push(commandData);
      globalCommands.push({
        ...commandData,
        integration_types: [0, 1],
        contexts: [0, 1, 2],
      });
    }
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    if (process.env.GUILD_ID) {
      // Register commands in the guild for testing.
      const guildData = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log(`✓ Successfully registered ${guildData.length} guild commands.`);

      // Register global commands with DM/group-chat contexts.
      const globalData = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: globalCommands }
      );
      console.log(`✓ Successfully registered ${globalData.length} global commands.`);
    } else {
      // Register globally with DM/group-chat contexts.
      const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: globalCommands }
      );
      console.log(`✓ Successfully registered ${data.length} global commands.`);
    }
  } catch (error) {
    console.error(error);
  }
})();
