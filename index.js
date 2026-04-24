const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
// Requerimos dotenv para leer el token localmente (opcional si usas hosting)
require('dotenv').config();

// ==================== CONFIGURACIÓN ====================
// El TOKEN no se escribe acá, se toma del archivo .env o del Panel de Control
const TOKEN = process.env.TOKEN; 

// ID del canal de La Vagancia
const ID_CANAL_GENERAL = '1391624633417076777'; 

// Enlace a la imagen en Imgur
const URL_IMAGEN = 'https://i.imgur.com/vH9Z97S.jpeg'; 

// 1 hora de intervalo
const INTERVALO_TIEMPO = 60 * 60 * 1000; 
// =======================================================

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.once('ready', () => {
    console.log(`✅ Bot de La Vagancia online!`);
    enviarAnuncio();
    setInterval(enviarAnuncio, INTERVALO_TIEMPO);
});

async function enviarAnuncio() {
    try {
        const canal = await client.channels.fetch(ID_CANAL_GENERAL);
        if (!canal) return;

        const embedAnuncio = new EmbedBuilder()
            .setTitle('🔥 ¡DOMINGO 5 DE MAYO: LANZAMIENTO DOBLE RACE! 🔥')
            .setDescription(
                'Prepárense para el evento más pesado del mes en **La Vagancia**. \n' +
                'Se pica la competencia con dos formas de ganar plata real:\n\n' +
                '🏆 **RACE WINS:** El que más apostados gane en el mes se queda con el premio mayor. 💸\n\n' +
                '🎤 **RACE VOICE:** El que más tiempo pase en los canales de voz suma puntos para el TOP. 💸\n\n' +
                '⚠️ **REQUISITO OBLIGATORIO:** Tener la insignia **VG** puesta para participar.'
            )
            .addFields(
                { name: '💰 PREMIOS A REPARTIR', value: '⭐ **400.000 ARS**', inline: false },
                { name: '📅 INICIO', value: '5 de Mayo', inline: true },
                { name: '🛡️ COMUNIDAD', value: 'La Vagancia', inline: true }
            )
            .setColor('#8B00FF')
            .setImage(URL_IMAGEN)
            .setTimestamp()
            .setFooter({ text: 'Administración La Vagancia', iconURL: URL_IMAGEN });

        await canal.send({ embeds: [embedAnuncio] });
        console.log(`[${new Date().toLocaleTimeString()}] Anuncio enviado.`);
    } catch (error) {
        console.error('Error al enviar:', error);
    }
}

client.login(TOKEN);