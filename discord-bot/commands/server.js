const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info'),
    async execute(interaction) {
        try {
        const guild = interaction.guild;
        const response = new EmbedBuilder()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Owner', value: '<@' + guild.ownerId + '>', inline: true },
                { name: 'Members', value: '' + guild.memberCount, inline: true },
                { name: 'Created', value: '' + guild.createdAt, inline: true },
            )
            .setColor(0x00AE86)
        await interaction.reply({ embeds: [response] });
        } catch (error) {
            console.log(error);
        }
    },
}