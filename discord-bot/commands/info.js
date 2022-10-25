const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with info about the bot'),
    async execute(interaction) {
        try {
            const creator = interaction.client.users.cache.get('275252107987386369');
            const reply = new EmbedBuilder()
                .setTitle('Info')
                .setDescription('This bot was created by <@275252107987386369>')
                .setColor(0x00AE86)
            reply.addFields({ name: 'Source Code', value: 'https://github.com/wonderrxjr/tronbot'},
                { name: 'Commands', value: 'There is no help command yet, but you can see all the commands by typing / in the chat.'});
            reply.setThumbnail(creator.avatarURL());
            await interaction.reply({embeds: [reply]});
        } catch (error) {
            console.log(error);
        }
    }
}