const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
require('dotenv').config();

// ==================== CONFIGURACIÓN ====================
const TOKEN = process.env.TOKEN; 
const ID_CANAL_GENERAL = '1391624633417076777'; 
const INTERVALO_ANUNCIO = 50 * 60 * 1000; 
const INTERVALO_INSIGNIA = 35 * 60 * 1000; 
// =======================================================

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.once('ready', () => {
    console.log(`✅ ¡Bot de La Vagancia online!`);

    // Ciclo 50 min (Evento)
    enviarAnuncio();
    setInterval(enviarAnuncio, INTERVALO_ANUNCIO);

    // Ciclo 35 min (Insignia)
    setTimeout(() => {
        enviarRecordatorioInsignia();
        setInterval(enviarRecordatorioInsignia, INTERVALO_INSIGNIA);
    }, 15000); 
});

// MENSAJE EVENTOS (Sin cambios)
async function enviarAnuncio() {
    try {
        const canal = await client.channels.fetch(ID_CANAL_GENERAL);
        if (!canal) return;

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
            .setThumbnail('attachment://araña.png') 
            .setImage('attachment://logo.png') 
            .setFooter({ text: 'Evento oficial de La Vagancia', iconURL: client.user.displayAvatarURL() });

        await canal.send({ embeds: [embedAnuncio], files: [logoPrincipal, insigniaVagancia] });
    } catch (error) { console.error(error); }
}

// MENSAJE INSIGNIA (Modificado a simple)
async function enviarRecordatorioInsignia() {
    try {
        const canal = await client.channels.fetch(ID_CANAL_GENERAL);
        if (!canal) return;

        const insigniaFile = new AttachmentBuilder('./araña.png');

        const embedInsignia = new EmbedBuilder()
            .setTitle('🛡️ REQUISITO OBLIGATORIO')
            .setDescription('Recuerden que para participar de los eventos tienen que tener la **insignia VG** sí o sí.')
            .setColor('#8B00FF') 
            .setImage('attachment://araña.png') // Muestra la araña en grande
            .setFooter({ text: 'La Vagancia' });

        await canal.send({ 
            embeds: [embedInsignia], 
            files: [insigniaFile] 
        });
    } catch (error) { console.error(error); }
}

client.login(TOKEN);