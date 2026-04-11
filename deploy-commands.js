const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const appId = process.env.CLIENT_ID;
if (!appId) {
  console.error('Missing CLIENT_ID in .env. Set CLIENT_ID to your application ID.');
  process.exit(1);
}

const commands = [];
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

      commands.push(command.data.toJSON());
    }
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    if (process.env.GUILD_ID) {
      if (process.env.REGISTER_GUILD_COMMANDS === 'true') {
        const guildData = await rest.put(
          Routes.applicationGuildCommands(appId, process.env.GUILD_ID),
          { body: commands }
        );
        console.log(`✓ Successfully registered ${guildData.length} guild commands.`);
      } else {
        await rest.put(
          Routes.applicationGuildCommands(appId, process.env.GUILD_ID),
          { body: [] }
        );
        console.log('✓ Removed existing guild commands to avoid duplication with global commands.');
      }
    }

    const globalData = await rest.put(
      Routes.applicationCommands(appId),
      { body: commands }
    );
    console.log(`✓ Successfully registered ${globalData.length} global commands.`);

    if (process.env.GUILD_ID && process.env.REGISTER_GUILD_COMMANDS !== 'true') {
      console.log('Note: GUILD_ID is set, but REGISTER_GUILD_COMMANDS is not true. Existing guild commands were cleared so only the global command set is active.');
    }
  } catch (error) {
    console.error(error);
  }
})();
