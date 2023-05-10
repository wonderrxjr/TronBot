const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leaves the voice channel'),
    async execute(interaction) {
        try {
            const connection = getVoiceConnection(interaction.guildId);
            if (connection) {
                connection.destroy();
                await interaction.reply({ content: 'Left the voice channel', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Not in a voice channel', ephemeral: true });
            }
        } catch (error) {
            console.log(error);
        }
    }
}