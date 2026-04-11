const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes,
} = require('discord.js');

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

/*
  CORRECT STRUCTURE:
  commands/        -> SLASH COMMANDS (/ping)
  prefixCommands/  -> PREFIX COMMANDS (-ping)
*/

client.commands = new Collection();        // slash commands
client.prefixCommands = new Collection();  // prefix commands
client.cooldowns = new Collection();

const slashCommandsArray = [];

/* ---------------- HELPERS ---------------- */

function isValidCommandFile(cmd, isSlash) {
  if (isSlash) return cmd?.data && cmd?.execute;
  return cmd?.name && cmd?.execute;
}

/* ---------------- LOAD COMMANDS ---------------- */

function loadCommands(dir, isSlash) {
  if (!fs.existsSync(dir)) return;

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      loadCommands(fullPath, isSlash);
      continue;
    }

    if (!file.endsWith('.js')) continue;

    try {
      const cmd = require(fullPath);

      if (!isValidCommandFile(cmd, isSlash)) {
        console.log(`✗ Missing required properties: ${fullPath}`);
        continue;
      }

      if (isSlash) {
        if (typeof cmd.data.setDMPermission === 'function') {
          cmd.data.setDMPermission(true);
        }

        client.commands.set(cmd.data.name, cmd);

        const data =
          typeof cmd.data.toJSON === 'function'
            ? cmd.data.toJSON()
            : cmd.data;

        slashCommandsArray.push(data);

        console.log(`✓ Loaded slash command: ${cmd.data.name}`);
      } else {
        client.prefixCommands.set(cmd.name, cmd);
        console.log(`✓ Loaded prefix command: ${cmd.name}`);
      }
    } catch (err) {
      console.error(`✗ Failed loading: ${fullPath}`);
      console.error(err);
    }
  }
}

/* FIXED PATHS (THIS IS THE IMPORTANT PART) */
const slashPath = path.join(__dirname, 'commands');        // SLASH
const prefixPath = path.join(__dirname, 'prefixCommands'); // PREFIX

loadCommands(slashPath, true);
loadCommands(prefixPath, false);

/* ---------------- SLASH HANDLER ---------------- */

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return console.log(`Unknown slash command: ${interaction.commandName}`);

  try {
    await cmd.execute(interaction, client);
  } catch (err) {
    console.error(err);
    if (!interaction.replied) {
      interaction.reply({ content: 'Error executing command.', ephemeral: true });
    }
  }
});

/* ---------------- READY + REGISTER SLASH ---------------- */

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  const appId = process.env.CLIENT_ID || client.user.id;
  const globalSlashCommands = slashCommandsArray.map((command) => ({
    ...command,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  }));

  try {
    if (process.env.GUILD_ID) {
      await rest.put(
        Routes.applicationGuildCommands(appId, process.env.GUILD_ID),
        { body: slashCommandsArray }
      );
      console.log('Slash commands registered (guild).');
    }

    await rest.put(
      Routes.applicationCommands(appId),
      { body: globalSlashCommands }
    );
    console.log('Slash commands registered (global, DM/group chat enabled).');
  } catch (err) {
    console.error('Slash register error:', err);
  }

  /* PREFIX CONSOLE TESTING */
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (input) => {
    if (!input) return;

    const raw = input.trim();
    const clean = raw.replace(/^[-/]/, '');
    const args = clean.split(/ +/);
    const name = args.shift().toLowerCase();

    const cmd = client.prefixCommands.get(name);

    if (!cmd) {
      if (client.commands.get(name)) {
        return console.log(`/${name} is a slash command`);
      }
      return console.log(`Unknown command: ${name}`);
    }

    try {
      const fakeMessage = {
        content: raw,
        author: { id: 'console', username: 'Console' },
        reply: (x) => console.log('[BOT]', x),
      };

      await cmd.execute(fakeMessage, args, client);
    } catch (err) {
      console.error(err);
    }
  });
});

client.login(process.env.DISCORD_TOKEN);