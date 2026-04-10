const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Show available commands',

  async execute(message, args) {
    const category = args[0]?.toLowerCase();

    const commandsByCategory = {
      moderation: [
        'kick', 'ban', 'mute', 'unmute', 'warn', 'unban',
        'timeout', 'slowmode', 'lockdown', 'purge', 'modlogs'
      ],
      fun: [
        'meme', 'rate', '8ball', 'dice', 'flip', 'choose',
        'joke', 'compliment', 'nitro', 'slap', 'hug', 'kiss'
      ],
      utility: [
        'userinfo', 'serverinfo', 'avatar', 'ping', 'stats',
        'prefix', 'send', 'channelinfo', 'roleinfo'
      ],
      admin: [
        'say', 'announce', 'purge', 'giverole', 'takerole', 'help'
      ]
    };

    // MAIN MENU
    if (!category) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('📚 Bot Help')
        .setDescription('Use `-help [category]` to view commands')
        .addFields(
          {
            name: '🛡️ Moderation',
            value: commandsByCategory.moderation.join(', '),
          },
          {
            name: '🎮 Fun',
            value: commandsByCategory.fun.join(', '),
          },
          {
            name: '🔧 Utility',
            value: commandsByCategory.utility.join(', '),
          },
          {
            name: '⚙️ Admin',
            value: commandsByCategory.admin.join(', '),
          }
        )
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    }

    const commands = commandsByCategory[category];

    if (!commands) {
      return message.reply('❌ Invalid category: moderation, fun, utility, admin');
    }

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle(`📚 ${category.toUpperCase()} Commands`)
      .setDescription(commands.map(c => `• \`${c}\``).join('\n'))
      .setTimestamp();

    return message.reply({ embeds: [embed] });
  },
};