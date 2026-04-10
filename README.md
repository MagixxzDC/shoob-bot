# Advanced Discord Bot

A feature-rich Discord bot with Dyno-like command functionality, built with discord.js v14.

## Features

### Command System
- **Slash Commands** - Type `/` followed by command name
- **Prefix Commands** - Default prefix: `-`

### 🛡️ Moderation Commands
- **kick** - Kick a user from the server
- **ban** - Ban a user from the server  
- **mute** - Mute/timeout a user
- **unmute** - Unmute a user
- **warn** - Warn a user
- **unban** - Unban a user
- **timeout** - Timeout a user with duration
- **slowmode** - Set channel slowmode
- **lockdown** - Lock/unlock channel
- **purge** - Delete multiple messages
- **modlogs** - View bans, mutes, kicks, and warns

### 🎮 Fun Commands
- **8ball** - Ask the magic 8 ball a question
- **dice** - Roll a dice (customizable sides)
- **flip** - Flip a coin
- **choose** - Choose between options
- **joke** - Tell a random joke
- **compliment** - Send a compliment to a user
- **meme** - Get a random meme
- **rate** - Rate something (1-10)

### 🔧 Utility Commands
- **userinfo** - Get information about a user
- **serverinfo** - Get information about the server
- **avatar** - Get a user's avatar
- **ping** - Check bot latency
- **channelinfo** - Get channel information
- **roleinfo** - Get role information
- **stats** - Get bot statistics
- **prefix** - Show current prefix

### ⚙️ Admin Commands
- **help** - Show available commands by category
- **giverole** - Give a role to a user
- **takerole** - Remove a role from a user
- **say** - Make the bot say something
- **announce** - Send an announcement embed

## Setup

### Prerequisites
- Node.js 16.9.0 or higher
- A Discord bot token
- discord.js v14

### Installation

1. **Clone or download this project**

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file in the root directory:**
```
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
PREFIX=-
```

**Where to find these:**
- `DISCORD_TOKEN`: Go to [Discord Developer Portal](https://discord.com/developers/applications) → Your App → Bot → Copy Token
- `CLIENT_ID`: Your App ID from the General Information section
- `GUILD_ID`: Your server ID (Optional, for faster command registration)
- `PREFIX`: The command prefix (default: `-`)

> Note: For prefix commands to work, enable the **MESSAGE CONTENT INTENT** in the Discord Developer Portal under your Bot settings. If you also want server member lookup features, enable **SERVER MEMBERS INTENT** too.
>
> If `GUILD_ID` is set, commands are also registered in that guild for faster testing. The bot now also deploys global slash commands so they can work in DMs, but global propagation may take a few minutes to complete.

4. **Invite your bot to your server:**
Navigate to:
```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```
Replace `YOUR_CLIENT_ID` with your actual Client ID.

> If the bot still will not join your server, make sure:
> - you are using the correct `CLIENT_ID`
> - you have the `Manage Server` permission on the target server
> - the bot is public in the Developer Portal
> - `Require OAuth2 Code Grant` is disabled unless you need it
> - the invite URL includes both `bot` and `applications.commands`

### Running the Bot

1. **Register slash commands (run once):**
```bash
node deploy-commands.js
```
This registers all slash commands with Discord.

2. **Start the bot:**
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## Commands Usage

### Slash Commands (/)
- `/help` - Shows all available commands
- `/help category:fun` - Shows fun commands
- `/kick @Member reason:Spamming` - Kick a member
- `/ban @Member` - Ban a member
- `/modlogs bans` - View current bans
- `/modlogs mutes` - View active mutes/timeouts
- `/modlogs kicks` - View recent kicks
- `/modlogs warns [user:@Member]` - View saved warnings
- `/ping` - Check bot latency
- `/userinfo @Member` - Get user information
- `/8ball question:Will I pass my test?` - Ask 8 ball

### Prefix Commands (-)
- `-help` - Shows all available commands
- `-help moderation` - Shows moderation commands
- `-kick @user reason` - Kick a user
- `-ban @user` - Ban a user
- `-modlogs bans` - View current bans
- `-modlogs mutes` - View active mutes/timeouts
- `-modlogs kicks` - View recent kicks
- `-modlogs warns [@user]` - View saved warnings
- `-mute @user 10m` - Mute a user for 10 minutes
- `-warn @user` - Warn a user
- `-ping` - Check bot latency
- `-userinfo @user` - Get user information
- `-stats` - Get bot statistics
- `-8ball Will I pass?` - Ask 8 ball
- `-announce Your message` - Send announcement
- `-meme` - Get a random meme

## Color Coding

All embeds use the sophisticated color: `#141414` (Dark Gray) for a professional, unified look.

## Permissions

The bot requires the following permissions to function:
- Send Messages
- Embed Links
- Kick Members
- Ban Members
- Manage Messages
- Manage Roles
- Manage Channels
- Moderate Members
- View Audit Log
- Read Messages/View Channels

## File Structure

```
├── index.js                    # Main bot file
├── deploy-commands.js          # Command deployment script
├── package.json               # Dependencies
├── .env                       # Environment variables (create this)
│
├── commands/                  # Slash commands
│   ├── moderation/           # Moderation commands
│   ├── fun/                  # Fun commands
│   ├── utility/              # Utility commands
│   └── admin/                # Admin commands
│
├── prefixCommands/           # Prefix commands
│   ├── moderation/           # Moderation commands
│   ├── fun/                  # Fun commands
│   ├── utility/              # Utility commands
│   └── admin/                # Admin commands
│
└── events/                   # Event handlers
    ├── ready.js              # Bot ready event
    ├── interactionCreate.js  # Slash command handler
    └── messageCreate.js      # Prefix command handler
```

## Cooldowns

Most commands have a 3-second cooldown to prevent spam. The bot will notify users when they're on cooldown.

## Error Handling

The bot has built-in error handling for both slash and prefix commands. If a command fails, users will receive an error message.

## Contributing

Feel free to add more commands by:

**For Slash Commands:**
1. Create a new file in `commands/[category]/`
2. Follow the structure in existing slash commands
3. Slash commands load automatically

**For Prefix Commands:**
1. Create a new file in `prefixCommands/[category]/`
2. Follow the structure in existing prefix commands
3. Prefix commands load automatically

MIT

## Disclaimer

This bot is for educational purposes. Use responsibly and respect Discord's Terms of Service.
