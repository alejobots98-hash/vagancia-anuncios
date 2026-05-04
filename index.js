const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// CONFIGURACIÓN
const TOKEN = 'TU_TOKEN_ACA'; // Recordá poner tu token real aquí
const CHANNEL_ID = '1391624633417076777';

client.once('ready', async () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);

    try {
        const channel = await client.channels.fetch(CHANNEL_ID);

        if (!channel) {
            console.error("❌ No se encontró el canal. Verificá que el bot esté en el servidor.");
            return;
        }

        // Ejecuta cada 30 minutos (1800000 ms)
        setInterval(async () => {
            try {
                const file = new AttachmentBuilder('./araña.png');

                const embed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('🚨 IMPORTANTE 🚨')
                    .setDescription(
`📢 **5 de mayo, 21 HS comienzan las dos race!**
🏁 **Race Voice** y **Race Wins**

💰 **200.000 ARS cada una**
💸 **TOTAL: 400.000 ARS a repartir**

━━━━━━━━━━━━━━━━━━━━━━

⚠️ **OBLIGATORIO**
🔥 **TENER LA INSIGNIA VG PARA PODER PARTICIPAR** 🔥

━━━━━━━━━━━━━━━━━━━━━━

📌 Más información en:
🔊 **race voice**
🎮 **race wins**

🍀 ¡Mucha suerte a todos!`
                    )
                    .setImage('attachment://araña.png');

                await channel.send({ embeds: [embed], files: [file] });
                console.log(`📢 Mensaje de evento enviado a las ${new Date().toLocaleTimeString()}`);

            } catch (err) {
                console.error('❌ Error al enviar el mensaje programado:', err);
            }
        }, 1800000);

    } catch (error) {
        console.error('❌ Error al obtener el canal:', error);
    }
});

client.login(TOKEN);