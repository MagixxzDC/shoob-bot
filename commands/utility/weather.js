const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Get real weather information')
    .addStringOption(option =>
      option
        .setName('location')
        .setDescription('Location to check weather for')
        .setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const location = interaction.options.getString('location');

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return interaction.reply({ content: 'Weather API key missing.', ephemeral: true });
    }

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`
      );

      const data = await res.json();

      if (data.error) {
        return interaction.reply({ content: 'Location not found.', ephemeral: true });
      }

      const tempC = data.current.temp_c;
      const tempF = data.current.temp_f;

      const embed = new EmbedBuilder()
        .setColor('#141414')
        .setTitle(`🌤️ Weather in ${data.location.name}, ${data.location.country}`)
        .addFields(
          { name: 'Condition', value: data.current.condition.text, inline: true },
          { name: 'Temperature', value: `${tempC}°C / ${tempF}°F`, inline: true },
          { name: 'Humidity', value: `${data.current.humidity}%`, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      interaction.reply({ content: 'Failed to fetch weather.', ephemeral: true });
    }
  },
};