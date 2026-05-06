const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Usamos variables de entorno para Railway
const TOKEN = process.env.DISCORD_TOKEN; 
const CHANNEL_ID = '1391624633417076777';

client.once('ready', () => {
    console.log(`✅ Bot online como ${client.user.tag}`);

    // Intervalo de 30 minutos
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (!channel) return;

            const file = new AttachmentBuilder('./araña.png');

            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(
`📢 Recuerden que, para participar en los eventos activos, es obligatorio contar con la insignia VG y jugar en los canales de voz de Vagancia.

🎉 Próximamente, el día 13, se realizará el evento Race WinQueens femenino con un premio de $100.000 ARS. ¡No se lo pierdan!

💰 Actualmente hay 3 eventos disponibles, con un pozo total de $500.000 ARS.`
                )
                .setThumbnail('attachment://araña.png');

            await channel.send({ embeds: [embed], files: [file] });
            
        } catch (error) {
            console.error('Error en el envío programado:', error);
        }
    }, 1800000);
});

// Sistema para que Railway no mate el proceso
client.login(TOKEN);