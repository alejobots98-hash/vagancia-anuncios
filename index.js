const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = '1391624633417076777';

// ================================
// ANUNCIO REQUISITOS
// ================================
async function enviarRequisitos() {
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (!channel) return;

        const file = new AttachmentBuilder('./araña.png');

        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(
`# 📢 REQUISITOS PARA PARTICIPAR

━━━━━━━━━━━━━━━━━━

✅ Tener la etiqueta / insignia VG

🎙️ Jugar dentro de los canales de voz de Vagancia

━━━━━━━━━━━━━━━━━━

📌 El incumplimiento de alguno de estos requisitos puede invalidar tu participación en eventos y rankings.

👑 ¡Gracias por formar parte de La Vagancia!`
            )
            .setThumbnail('attachment://araña.png');

        await channel.send({
            embeds: [embed],
            files: [file]
        });

    } catch (error) {
        console.error('Error en anuncio de requisitos:', error);
    }
}

// ================================
// ANUNCIO ROLES Y SOPORTE
// ================================
async function enviarRoles() {
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (!channel) return;

        const rolVGTop = '<@&1281358394225066084>';
        const rolTrigger = '<@&1485467514371575888>';

        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(
`# 🎭 ENTREGA DE ROLES Y SOPORTE

━━━━━━━━━━━━━━━━━━

📌 ¿Necesitás alguna etiqueta, insignia o rol?

👑 Los cargos encargados de entregar roles y brindar ayuda son:

🔥 ${rolVGTop}
⚡ ${rolTrigger}

━━━━━━━━━━━━━━━━━━

💬 Podés comunicarte con ellos:

• Por este mismo chat
• O directamente por privado

📢 Apenas estén disponibles te estarán respondiendo.

━━━━━━━━━━━━━━━━━━

👑 Gracias por formar parte de La Vagancia`
            );

        await channel.send({
            content: `${rolVGTop} ${rolTrigger}`,
            embeds: [embed]
        });

    } catch (error) {
        console.error('Error en anuncio de roles:', error);
    }
}

// ================================
// ANUNCIO RACE WINS
// ================================
async function enviarRaceWins() {
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (!channel) return;

        const file = new AttachmentBuilder('./eventos.png');

        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(
`# 🏆 RACE WINS REGRESA A LA VAGANCIA 🏆

🔥 **200.000 ARS A REPARTIR** 🔥

¿Tenés lo necesario para convertirte en el nuevo campeón?

Demostralo en uno de los eventos más esperados de la comunidad.

━━━━━━━━━━━━━━━━━━

📅 **Inicio:** Viernes 19

💰 **Premio total:** 200.000 ARS

👑 **Solo uno se llevará la gloria**

━━━━━━━━━━━━━━━━━━

⚔️ Prepará tu mejor juego, reuní a tu equipo y vení a competir contra los mejores.

🔗 **discord.gg/lavagancia**

━━━━━━━━━━━━━━━━━━

🏆🔥 ¿QUIÉN SERÁ EL NUEVO CAMPEÓN? 🔥🏆`
            )
            .setImage('attachment://eventos.png');

        await channel.send({
            embeds: [embed],
            files: [file]
        });

    } catch (error) {
        console.error('Error en anuncio Race Wins:', error);
    }
}

client.once('ready', () => {
    console.log(`✅ Bot online como ${client.user.tag}`);

    // ================================
    // REQUISITOS
    // ================================
    enviarRequisitos();
    setInterval(enviarRequisitos, 3600000); // cada 1 hora

    // ================================
    // ROLES (20 min después)
    // ================================
    setTimeout(() => {
        enviarRoles();
        setInterval(enviarRoles, 3600000); // cada 1 hora
    }, 1200000); // 20 minutos

    // ================================
    // RACE WINS
    // ================================
    enviarRaceWins();
    setInterval(enviarRaceWins, 1800000); // cada 30 minutos
});

client.login(TOKEN);