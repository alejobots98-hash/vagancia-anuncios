const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
require('dotenv').config();

// ==================== CONFIGURACIÓN ====================
const TOKEN = process.env.TOKEN; 
const ID_CANAL_GENERAL = '1391624633417076777'; 
const INTERVALO_TIEMPO = 50 * 60 * 1000; // Cambiado a 50 minutos
// =======================================================

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.once('ready', () => {
    console.log(`✅ ¡Bot de La Vagancia online!`);
    console.log(`🤖 Logueado como: ${client.user.tag}`);

    enviarAnuncio();
    setInterval(enviarAnuncio, INTERVALO_TIEMPO);
});

async function enviarAnuncio() {
    try {
        const canal = await client.channels.fetch(ID_CANAL_GENERAL);
        if (!canal) return console.error("❌ No encontré el canal.");

        // Preparamos los archivos locales
        const logoPrincipal = new AttachmentBuilder('./logo.png');
        const insigniaVagancia = new AttachmentBuilder('./araña.png');

        const embedAnuncio = new EmbedBuilder()
            .setTitle('🔥 ¡DOMINGO 5 DE MAYO: LANZAMIENTO DOBLE RACE! 🔥')
            .setDescription(
                'Prepárense para el evento más pesado del mes en **La Vagancia**. \n' +
                'Se pica la competencia con dos formas de ganar plata real:\n\n' +
                '🏆 **RACE WINS:** El que más apostados gane en el mes se queda con el premio mayor. 💸\n\n' +
                '🎤 **RACE VOICE:** ¡Premio a la constancia! El que más tiempo pase en los canales de voz sumando puntos llega al TOP. 💸\n\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '⚠️ **AVISO IMPORTANTE:**\n' +
                '# 🛡️ OBLIGATORIO TENER LA INSIGNIA VG PARA PARTICIPAR DE LOS EVENTOS\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
                '¡No duerman, los esperamos para este doble eventazo! 🏎️💨'
            )
            .addFields(
                { name: '💰 TOTAL A REPARTIR', value: '📊 **400k ARS**', inline: false },
                { name: '📅 INICIO', value: '5 de Mayo', inline: true },
                { name: '🛡️ SERVER', value: 'La Vagancia', inline: true }
            )
            .setColor('#8B00FF')
            .setTimestamp()
            // La "araña" aparece en pequeño arriba a la derecha
            .setThumbnail('attachment://araña.png') 
            // El logo grande abajo
            .setImage('attachment://logo.png') 
            .setFooter({ text: 'Evento oficial de La Vagancia', iconURL: client.user.displayAvatarURL() });

        // Enviamos el embed con ambos archivos adjuntos
        await canal.send({ 
            embeds: [embedAnuncio], 
            files: [logoPrincipal, insigniaVagancia] 
        });
        
        console.log(`[${new Date().toLocaleTimeString()}] ✅ Anuncio enviado (Intervalo: 50 min).`);

    } catch (error) {
        console.error('❌ Error al enviar:', error);
    }
}

client.login(TOKEN);