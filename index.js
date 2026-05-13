const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = '1391624633417076777';

client.once('ready', () => {
    console.log(`✅ Bot online como ${client.user.tag}`);

    // --- ANUNCIO 1: REGLAS Y EVENTOS ACTIVOS (Cada 1 hora) ---
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (!channel) return;

            const file = new AttachmentBuilder('./araña.png');

            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(
`📢 **REGLAS Y EVENTOS ACTIVOS**

🎮 Para participar en los eventos activos es obligatorio:

✅ Tener la etiqueta / insignia VG
✅ Jugar dentro de los canales de voz de Vagancia

💸 Actualmente contamos con 3 eventos activos
🔥 Pozo total de $600.000 ARS

👑 Próximamente llega el evento femenino:
💖 RACE WIN QUEENS FEM 💖

📅 Inicio: 13 de Mayo
🏆 Premio total: $200.000 ARS`
                )
                .setThumbnail('attachment://araña.png');

            await channel.send({
                embeds: [embed],
                files: [file]
            });

        } catch (error) {
            console.error('Error en el anuncio de 1 hora:', error);
        }
    }, 3600000);

    // --- ANUNCIO 2: RACE WIN FEM (Cada 30 minutos) ---
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (!channel) return;

            const fileFem = new AttachmentBuilder('./torneofem.png');

            const embedFem = new EmbedBuilder()
                .setColor('#ff1493')
                .setDescription(
`# 💖 RACE WIN FEM 💖

## ⏰ INICIA 21 HS
## 🏷️ RECUERDEN TENER ETIQUETA VG

━━━━━━━━━━━━━━━━━━

📅 El evento exclusivamente femenino

💸 **200.000 ARS** a repartir en premios
👑 ¿Quién será la próxima Queen Win?

🔥 Demostrá quién domina la competencia
👑 Llevate la corona de Vagancia

✨ Evento exclusivo para mujeres

━━━━━━━━━━━━━━━━━━

🎮 Servidor: **La Vagancia**

🔗 discord.gg/lavaganciagg`
                )
                .setImage('attachment://torneofem.png');

            await channel.send({
                embeds: [embedFem],
                files: [fileFem]
            });

        } catch (error) {
            console.error('Error en el anuncio de 30 min:', error);
        }
    }, 1800000);
});

client.login(TOKEN);