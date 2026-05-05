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
                .setTitle('🚨 IMPORTANTE 🚨')
                .setDescription(
`📢 **HOY INICIAN LOS EVENTOS, 21 HS comienzan las dos race!**
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
            
        } catch (error) {
            console.error('Error en el envío programado:', error);
        }
    }, 1800000);
});

// Sistema para que Railway no mate el proceso
client.login(TOKEN);