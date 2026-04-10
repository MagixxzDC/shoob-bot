# Advanced Discord Bot - Project Instructions

## Project Setup Checklist

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements - Advanced Discord bot with Dyno-like commands
- [x] Scaffold the Project - Created Node.js project structure with discord.js
- [x] Customize the Project - Added 30+ commands across 4 categories (slash + prefix)
- [x] Install Required Extensions - No VS Code extensions needed
- [x] Compile the Project - Install dependencies and verify setup
- [x] Create and Run Task - Set up bot startup task
- [x] Launch the Project - Start the bot with proper token configuration
- [x] Ensure Documentation is Complete - README.md created with full instructions

## Project Overview

This is an Advanced Discord Bot built with discord.js v14 that includes Dyno-like functionality:

**Command System:**
- Slash Commands (Using `/`)
- Prefix Commands (Using `-` by default)

**Command Categories:**

**Moderation (10 commands):**
- kick, ban, mute, unmute, warn, unban, timeout, slowmode, lockdown, purge

**Fun (8 commands):**
- 8ball, dice, flip, choose, joke, compliment, meme, rate

**Utility (8 commands):**
- userinfo, serverinfo, avatar, ping, channelinfo, roleinfo, stats, prefix

**Admin (5 commands):**
- help, giverole, takerole, say, announce

**Total: 31+ Commands**

## Design Features

- **Unified Color Scheme**: All embeds use #141414 (Dark Gray) for professional appearance
- **Dual Command System**: Both slash commands and prefix commands
- **Permission Checking**: All moderation commands verify user permissions
- **Cooldown System**: 3-second default cooldown on all commands
- **Error Handling**: Beautiful error embeds for all scenarios
- **User Feedback**: Clear confirmation embeds for all actions

## Setup Instructions

1. Run `npm install` to install dependencies
2. Create `.env` file with your Discord bot token and set PREFIX=-
3. Run `node deploy-commands.js` to register slash commands
4. Run `npm start` to launch the bot

## Environment Variables Required

```
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here (optional)
PREFIX=-
```

## Key Technologies

- discord.js v14
- Node.js
- dotenv for environment variables
- Slash commands with discord.js
- Message-based prefix commands
