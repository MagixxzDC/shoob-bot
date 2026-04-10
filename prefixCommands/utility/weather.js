const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'weather',
  description: 'Get real weather information',

  async execute(message, args) {
    const location = args.join(' ');
    if (!location) return message.reply('Provide a location.');

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) return message.reply('Weather API key missing.');

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`
      );

      const data = await res.json();

      if (data.error) {
        return message.reply('Location not found.');
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

      message.reply({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      message.reply('Failed to fetch weather.');
    }
  },
};