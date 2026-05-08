const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = '1391624633417076777';

client.once('ready', () => {
    console.log(`✅ Bot online como ${client.user.tag}`);

    // --- ANUNCIO 1: REGLAS Y EVENTOS ACTIVOS (Cada 30 minutos) ---
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (!channel) return;

            const file = new AttachmentBuilder('./araña.png');

            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(
`📢 Recuerden que, para participar en los eventos activos, es obligatorio contar con la insignia VG y jugar en los canales de voz de Vagancia.

🎉 Próximamente, el día 13, se realizará el evento Race WinQueens femenino con un premio de $200.000 ARS. ¡No se lo pierdan!

💰 Actualmente hay 3 eventos disponibles, con un pozo total de $600.000 ARS.`
                )
                .setThumbnail('attachment://araña.png');

            await channel.send({
                embeds: [embed],
                files: [file]
            });

        } catch (error) {
            console.error('Error en el anuncio de 30 min:', error);
        }
    }, 1800000);

    // --- ANUNCIO 2: RACE WIN FEM (Cada 1 hora) ---
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (!channel) return;

            // NUEVA IMAGEN
            const fileFem = new AttachmentBuilder('./torneofem.png');

            const embedFem = new EmbedBuilder()
                .setColor('#ff1493')
                .setDescription(
`💖 RACE WIN FEM 💖

📅 El evento exclusivamente femenino arranca el 13 de Mayo

💸 200.000 ARS a repartir en premios
👑 ¿Quién será la próxima Queen Win?

🔥 Demostrá quién domina la competencia y llevate la corona
✨ Evento exclusivo para mujeres

🎮 Servidor: LaVagancia

🔗 discord.gg/lavaganciagg`
                )
                .setImage('attachment://torneofem.png');

            await channel.send({
                embeds: [embedFem],
                files: [fileFem]
            });

        } catch (error) {
            console.error('Error en el anuncio de 1 hora:', error);
        }
    }, 3600000);
});

client.login(TOKEN);