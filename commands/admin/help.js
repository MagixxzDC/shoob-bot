const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help with bot commands')
    .addStringOption(option =>
      option
        .setName('category')
        .setDescription('Command category')
        .setRequired(false)
        .addChoices(
          { name: 'Moderation', value: 'moderation' },
          { name: 'Fun', value: 'fun' },
          { name: 'Utility', value: 'utility' },
          { name: 'Admin', value: 'admin' }
        )
    )
    .setDMPermission(true),

  async execute(interaction) {
    const category = interaction.options.getString('category');

    const commandsByCategory = {
      moderation: [
        'ban', 'kick', 'modlogs', 'purge', 'softban',
        'tempmute', 'warn', 'warnings'
      ],
      fun: [
        '8ball', 'choose', 'compliment', 'dice', 'flip',
        'hug', 'joke', 'kiss', 'nitro', 'roast',
        'slap', 'trivia'
      ],
      utility: [
        'avatar', 'calculator', 'channelinfo', 'ping',
        'poll', 'roleinfo', 'send', 'serverinfo',
        'snipe', 'userinfo', 'weather'
      ],
      admin: [
        'help', 'giverole', 'takerole'
      ]
    };

    // MAIN MENU
    if (!category) {
      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle('📚 Bot Help')
        .setDescription('Use `/help [category]`')
        .addFields(
          {
            name: '🛡️ Moderation',
            value: commandsByCategory.moderation.join(', ')
          },
          {
            name: '🎮 Fun',
            value: commandsByCategory.fun.join(', ')
          },
          {
            name: '🔧 Utility',
            value: commandsByCategory.utility.join(', ')
          },
          {
            name: '⚙️ Admin',
            value: commandsByCategory.admin.join(', ')
          }
        );

      return interaction.reply({ embeds: [embed] });
    }

    const commands = commandsByCategory[category];

    if (!commands) {
      return interaction.reply({
        content: '❌ Invalid category.',
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle(`📚 ${category.toUpperCase()} Commands`)
      .setDescription(commands.map(c => `• \`${c}\``).join('\n'));

    return interaction.reply({ embeds: [embed] });
  },
};