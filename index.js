const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// ⚠️ CONFIGURÁ ESTO
const TOKEN = 'TU_TOKEN_ACA';
const CHANNEL_ID = 'ID_DEL_CANAL';

client.once('ready', () => {
    console.log(`Bot listo como ${client.user.tag}`);

    // Ejecuta cada 30 minutos (1800000 ms)
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);

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

            channel.send({ embeds: [embed], files: [file] });

        } catch (error) {
            console.error('Error enviando mensaje:', error);
        }
    }, 1800000);
});

client.login(TOKEN);