// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials, Events, PermissionsBitField, EmbedBuilder} = require('discord.js');
const { token } = require('./config.json');
const moment = require("moment");

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.log('Something went wrong when fetching the message: ', error);
        }
    }
    if (user.partial) {
        try {
            await user.fetch();
        }
        catch (error) {
            console.log('Something went wrong when fetching the user: ', error);
        }
    }
    try {
        let guild = reaction.message.guild;
        let reporter = reaction.message.guild.members.cache.get(user.id);
        let is_member_bool = false;
        try {
            let is_member = await guild.members.fetch(reaction.message.author.id);
            is_member_bool = !!is_member;
        } catch (error) {
            is_member_bool = false;
        }
        let message = reaction.message.content;
        if (reaction.emoji.name === '🚫') {
            let description = '';
            if (reaction.message.author.id === user.id) {
                await reaction.message.delete();
            }
            else if (reporter.permissions.has(PermissionsBitField.Flags.Administrator) || reporter.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                await reaction.message.delete();
                description += '*The message was deleted by a moderator*\n';
            }
            if (reaction.message.author.id !== user.id && reaction.count === 1) {
                let now = new Date();
                let message_creation_date = new Date(reaction.message.createdTimestamp);
                let reacted_message_author_roles
                let long_message = false;
                if (!is_member_bool) {
                    description += `*User is not a member of this server*\n`;
                }
                if (is_member_bool) {
                    reacted_message_author_roles = reaction.message.member.roles.cache.map(role => role.name).join(', ');
                }
                const reported_message_embed_2 = new EmbedBuilder()
                const reported_message_embed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle('Reported message - ID: ' + reaction.message.id)
                if (description !== '') {
                    reported_message_embed.setDescription(description);
                }
                if (reaction.message.author.avatarURL() === null) {
                    reported_message_embed.setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png');
                }
                else {
                    reported_message_embed.setThumbnail(reaction.message.author.avatarURL());
                }
                reported_message_embed.addFields(
                    { name: 'User ID', value: '<@' + reaction.message.author.id + '>', inline: true },
                    { name: 'Username', value: reaction.message.author.tag, inline: true },
                );
                if (is_member_bool) {
                    let nickname = reaction.message.member.nickname;
                    reported_message_embed.addFields(
                        {name: 'Nickname', value: '' + nickname, inline: true},
                        {name: 'Roles', value: '' + reacted_message_author_roles, inline: true}
                    );
                }
                reported_message_embed.addFields({name: 'Channel', value: '<#' + reaction.message.channel.id + '>', inline: true})
                reported_message_embed.addFields(
                    {name: 'Message creation date', value: '<t:' + Math.floor(message_creation_date / 1000) + ':F>' , inline: true},
                )
                if (message.length > 1024) {
                    long_message = true;
                    let message_length = message.length;
                    let message_part_2 = message.slice(1021, message_length);
                    let message_part_1 = message.slice(0, 1021);
                    reported_message_embed.addFields(
                        {name: 'Message content', value: message_part_1 + '...', inline: false}
                    )
                    reported_message_embed_2
                        .setColor(0xff0000)
                        .setDescription('*The message was too long to be displayed in one embed field, so it was split into two.*')
                        .addFields({name: "Message content (continued)", value: "..." + message_part_2, inline: false})
                        .setFooter({
                            text: 'Reported by ' + reporter.user.tag  + " * " + now,
                            iconURL: user.avatarURL()
                        });
                } else {
                    if (reaction.message.content.length > 0) {
                        reported_message_embed.addFields(
                            {name: 'Message content', value: '' + message, inline: false}
                        )
                    } else {
                        reported_message_embed.addFields(
                            {
                                name: 'Message content',
                                value: '*The reported message only contained an attachment; make sure to have it saved before reporting it as the bot cannot currently save (deleted) pictures. You can also give out a description of the attachment below*',
                                inline: false
                            }
                        )
                    }
                }
                reported_message_embed.setFooter({
                    text: 'Reported by ' + reporter.user.tag + " * " + now,
                    iconURL: user.avatarURL()
                });
                await client.channels.cache.get('1278363771416481812').send({embeds: [reported_message_embed]});
                if (long_message) {
                    await client.channels.cache.get('1278363771416481812').send({embeds: [reported_message_embed_2]});
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
});

client.on(Events.GuildMemberUpdate, async(OldGuildMember, NewGuildMember) => {
    if(OldGuildMember.pending && !NewGuildMember.pending) {
        let clear_time = moment.duration(moment(moment().now).diff(NewGuildMember.joinedAt))
        if(clear_time.seconds() < 5) {
            await NewGuildMember.kick('Cleared onboarding too fast')
        }
    }
})

// Login to Discord
client.login(token);