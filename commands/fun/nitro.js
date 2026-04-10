const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nitro')
    .setDescription('Generate a fake Discord Nitro gift'),

  async execute(interaction) {
    const codes = [
      'discord.gift/EF12-GH34-IJ56',
      'discord.gift/KL78-MN90-OP12',
      'discord.gift/QR34-ST56-UV78',
      'discord.gift/AB12-CD34-EF56',
      'discord.gift/GH78-IJ90-KL12',
      'discord.gift/MN34-OP56-QR78',
      'discord.gift/ST90-UV12-WX34',
      'discord.gift/YZ56-AB78-CD90',
      'discord.gift/WX90-YZ12-AB34'
    ];
    const plans = ['Nitro Classic', 'Nitro', 'Nitro for Teams'];
    const code = codes[Math.floor(Math.random() * codes.length)];
    const plan = plans[Math.floor(Math.random() * plans.length)];

    const embed = new EmbedBuilder()
      .setColor('#141414')
      .setTitle('Nitro')
      .setDescription('Expires in 48 hours')
      .setImage('https://happypig375.github.io/free-nitro/nitro.png')
      .addFields(
        { name: 'Gift Link', value: '[Click here to claim your Nitro](https://www.youtube.com/watch?v=dQw4w9WgXcQ)', inline: false },
        { name: 'Code', value: `||\`${code}\`||`, inline: false },
        { name: 'Plan', value: plan, inline: true },
        { name: 'Status', value: 'Active', inline: true }
      )
      .setFooter({ text: 'A WILD GIFT APPEARS!' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
