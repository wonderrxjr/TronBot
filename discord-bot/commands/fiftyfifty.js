const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fiftyfifty')
        .setDescription('Replies with a yes or no (a coin toss if you will)'),
    async execute(interaction) {
        try {
            num = Math.floor(Math.random() * 2)
            if (num == 0) {
                await interaction.reply('FiftyFifty result: **NO**')
            }
            else {
                await interaction.reply('FiftyFifty result: **YES**')
            }
        }
        catch(error) {
            console.log(error)
        }
    }
}