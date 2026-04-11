const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const roasts = [
  'You bring everyone so much joy... when you leave the room.',
  'You\'re like a software update - whenever I see you, I think, "Not now."',
  'If I had a dollar for every time you said something smart, I\'d be broke.',
  'You\'re proof that evolution can go in reverse.',
  'You\'re like a cloud. When you disappear, it\'s a beautiful day.',
  'I love how you just sit there and act like you\'re not the reason I drink.',
  'You\'re not stupid; you just have bad luck when thinking.',
  'I\'d agree with you, but then we\'d both be wrong.',
  'You\'re like a sloth at the zoo - slow and nobody cares.',
  'If ignorance is bliss, you must be the happiest person on Earth.'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roast')
    .setDescription('Get roasted by the bot')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to roast (optional)')
        .setRequired(false)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('🔥 Roast')
      .setDescription(`${target}, ${roast}`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};