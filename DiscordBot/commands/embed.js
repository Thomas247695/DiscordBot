const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js')







module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('makes the verify embed'),
    async execute(interaction) {
        await interaction.deferReply({
            ephemeral: true
        })
        var embed = new EmbedBuilder()
            .setTitle('Minecraft account verification')
            .setDescription(`Verify to get full access to the server and see all the channels!

            FAQ
            
            Q: Why do we need you to verify?
            
            A: It's for auto-roles, We need to give you your class roles, catacomb-level roles, and verified roles. It's also just for extra security in-cases of a raid.
            
            Q: How long does it take for me to get my roles?
            
            A: We try to make the waiting time as little as possible, the fastest we were able to make it is as little as 30-50 seconds.

            Q: It's not loading! What do I do?

            A: It might be broken, so try entering everything again!`)
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('skrim')
                    .setLabel('Verify!')
                    .setStyle(ButtonStyle.Success),
            );

        await interaction.editReply({
            embeds: [{ title: `Embed Created!`, color: 0xA020F0, timestamp: new Date().toISOString() }],
            ephemeral: true
        });
        await interaction.channel.send({ embeds: [embed], components: [row] });
    },
};