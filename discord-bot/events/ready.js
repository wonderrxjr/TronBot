const songs = [
    ['Daftendirekt', 'Daft Punk', 165000],
    ['WDPK 83.7 FM', 'Daft Punk', 28000],
    ['Revolution 909', 'Daft Punk', 350000],
    ['Da Funk', 'Daft Punk', 329000],
    ['Phoenix', 'Daft Punk', 297000],
    ['Fresh', 'Daft Punk', 244000],
    ['Around the World', 'Daft Punk', 430000],
    ['Rollin\' & Scratchin\'', 'Daft Punk', 449000],
    ['Teachers', 'Daft Punk', 173000],
    ['High Fidelity', 'Daft Punk', 362000],
    ['Rock \'n Roll', 'Daft Punk', 454000],
    ['Oh Yeah', 'Daft Punk', 121000],
    ['Burnin\'', 'Daft Punk', 414000],
    ['Indo Silver Club', 'Daft Punk', 275000],
    ['Alive', 'Daft Punk', 316000],
    ['Funk Ad', 'Daft Punk', 51000],
    ['One More Time', 'Daft Punk', 320000],
    ['Aerodynamic', 'Daft Punk', 212000],
    ['Digital Love', 'Daft Punk', 301000],
    ['Harder, Better, Faster, Stronger', 'Daft Punk', 224000],
    ['Crescendolls', 'Daft Punk', 211000],
    ['Nightvision', 'Daft Punk', 104000],
    ['Superheroes', 'Daft Punk', 237000],
    ['High Life', 'Daft Punk', 201000],
    ['Something About Us', 'Daft Punk', 232000],
    ['Voyager', 'Daft Punk', 227000],
    ['Veridis Quo', 'Daft Punk', 345000],
    ['Short Circuit', 'Daft Punk', 206000],
    ['Face to Face', 'Daft Punk', 240000],
    ['Too Long', 'Daft Punk', 600000],
    ['Human After All', 'Daft Punk', 319000],
    ['The Prime Time of Your Life', 'Daft Punk', 263000],
    ['Robot Rock', 'Daft Punk', 287000],
    ['Steam Machine', 'Daft Punk', 320000],
    ['Make Love', 'Daft Punk', 290000],
    ['The Brainwasher', 'Daft Punk', 248000],
    ['On/Off', 'Daft Punk', 19000],
    ['Television Rules the Nation', 'Daft Punk', 287000],
    ['Technologic', 'Daft Punk', 284000],
    ['Emotion', 'Daft Punk', 416000],
    ['Give Life Back to Music', 'Daft Punk', 274000],
    ['The Game of Love', 'Daft Punk', 322000],
    ['Giorgio by Moroder', 'Daft Punk', 544000],
    ['Within', 'Daft Punk', 228000],
    ['Instant Crush (feat. Julian Casablancas)', 'Daft Punk', 261000],
    ['Lose Yourself to Dance (feat. Pharrell Williams)', 'Daft Punk', 353000],
    ['Touch (feat. Paul Williams)', 'Daft Punk', 498000],
    ['Get Lucky (feat. Pharrell Williams & Nile Rodgers)', 'Daft Punk', 369000],
    ['Beyond', 'Daft Punk', 290000],
    ['Motherboard', 'Daft Punk', 341000],
    ['Fragments of Time (feat. Todd Edwards)', 'Daft Punk', 279000],
    ['Doin\' It Right (feat. Panda Bear)', 'Daft Punk', 251000],
    ['Contact', 'Daft Punk', 381000],
    ['Horizon', 'Daft Punk', 265000],
    ['Starboy (feat. Daft Punk)', 'The Weeknd', 230000],
    ['I Feel It Coming (feat. Daft Punk)', 'The Weeknd', 229000],
    ['Overnight', 'Parcels', 219000],
    ['Music Sounds Better With You', 'Stardust', 404000],
]

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setStatus('online');
        console.log(`Ready! Logged in as ${client.user.tag}`);
        try {
            const setNextSong = () => {
                const song = songs[Math.floor(Math.random() * songs.length)];
                console.log(`Now playing ${song[0]} by ${song[1]}`);
                client.user.setActivity(song[0] + ' by ' + song[1], { type: 2 });
                setTimeout(setNextSong, song[2]);
            }
            setNextSong();
        } catch (error) {
            console.log(error);
        }
    },
};
