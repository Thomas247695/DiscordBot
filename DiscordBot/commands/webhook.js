const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('webhook')
    .setDescription('Set a webhook URL for a guild.')
    .addStringOption(option =>
      option.setName('webhook')
        .setDescription('The webhook URL.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('guild_id')
        .setDescription('The guild ID.')
        .setRequired(true)),
  async execute(interaction) {
    const webhookUrl = interaction.options.getString('webhook');
    const guildId = interaction.options.getString('guild_id');

    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8')); // read the existing config object from the file

    if (config[guildId]) {
      await interaction.reply(`A webhook URL already exists for guild ID ${guildId}. Please contact Rishie#4626 for assistance.`);
      return;
    }

    config[guildId] = { webhook: webhookUrl }; // add a new object for the guild with the webhook URL
    fs.writeFileSync('./config.json', JSON.stringify(config)); // save the updated config object to the file

    await interaction.reply(`Webhook URL ${webhookUrl} added for guild ID ${guildId}.`);
  },
};
