const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

// ==================== CONFIGURACIÓN ====================
const TOKEN = process.env.TOKEN; 
const ID_CANAL_GENERAL = '1391624633417076777'; 
const INTERVALO_TIEMPO = 60 * 60 * 1000; // 1 Hora exacta
// =======================================================

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.once('ready', () => {
    console.log(`✅ ¡Bot de La Vagancia online!`);
    console.log(`🤖 Logueado como: ${client.user.tag}`);

    // Mandar el primero al encender
    enviarAnuncio();

    // Ciclo de una hora
    setInterval(enviarAnuncio, INTERVALO_TIEMPO);
});

async function enviarAnuncio() {
    try {
        const canal = await client.channels.fetch(ID_CANAL_GENERAL);
        if (!canal) return console.error("❌ No encontré el canal.");

        const embedAnuncio = new EmbedBuilder()
            .setTitle('🔥 ¡DOMINGO 5 DE MAYO: LANZAMIENTO DOBLE RACE! 🔥')
            .setDescription(
                'Prepárense para el evento más pesado del mes en **La Vagancia**. \n' +
                'Se pica la competencia con dos formas de ganar plata real:\n\n' +
                '🏆 **RACE WINS:** El que más apostados gane en el mes se queda con el premio mayor. 💸\n\n' +
                '🎤 **RACE VOICE:** ¡Premio a la constancia! El que más tiempo pase en los canales de voz sumando puntos llega al TOP. 💸\n\n' +
                '⚠️ **REQUISITO OBLIGATORIO:** Tener la insignia **VG** puesta para participar.\n\n' +
                '¡No duerman, los esperamos para este doble eventazo! 🏎️💨'
            )
            .addFields(
                { name: '💰 TOTAL A REPARTIR', value: '📊 **400k ARS**', inline: false },
                { name: '📅 INICIO', value: '5 de Mayo', inline: true },
                { name: '🛡️ SERVER', value: 'La Vagancia', inline: true }
            )
            .setColor('#8B00FF') // Violeta característico
            .setTimestamp()
            .setFooter({ text: 'Evento oficial de La Vagancia', iconURL: client.user.displayAvatarURL() });

        await canal.send({ embeds: [embedAnuncio] });
        console.log(`[${new Date().toLocaleTimeString()}] ✅ Anuncio enviado.`);

    } catch (error) {
        console.error('❌ Error al enviar:', error);
    }
}

client.login(TOKEN);