const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins the voice channel you are in')
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('The voice channel to join')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice, ChannelType.GuildStageVoice)),
    async execute(interaction) {
        try {
            const channel = interaction.options.getChannel('channel');
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            await interaction.reply({ content: `Joined ${channel.name}`, ephemeral: true });
        } catch (error) {
            console.log(error);
        }
    }
}