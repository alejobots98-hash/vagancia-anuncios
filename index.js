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

📌 Toda la información y reglas se encuentran en los canales correspondientes del servidor.`
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

    // --- ANUNCIO 2: EVENTOS ACTIVOS (Cada 30 minutos) ---
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (!channel) return;

            const fileEvento = new AttachmentBuilder('./eventos.png');

            const embedEvento = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(
`# 🔥 ¡TODAVÍA ESTÁN A TIEMPO DE PARTICIPAR! 🔥

👑 En **La Vagancia** tenemos  
## 3 EVENTOS ACTIVOS
📅 Finalizan el **13 de Junio**

━━━━━━━━━━━━━━━━━━

🏆 **Eventos disponibles**

🎤 **Race Voice**  
💰 200.000 ARS a repartir

🔥 **Race Wins**  
💰 200.000 ARS a repartir

💖 **Race Wins FEMS**  
💰 200.000 ARS a repartir

━━━━━━━━━━━━━━━━━━

⚔️ Todavía pueden sumarse y pelear por los puestos más altos.

📌 Toda la información, reglas y tablas se encuentran en los canales de eventos del servidor.

🔥 Los esperamos en Vagancia…  
👑 ¡Y QUE GANE EL MEJOR!

🔗 discord.gg/lavaganciagg`
                )
                .setImage('attachment://eventos.png');

            await channel.send({
                embeds: [embedEvento],
                files: [fileEvento]
            });

        } catch (error) {
            console.error('Error en el anuncio de 30 min:', error);
        }
    }, 1800000);

    // --- ANUNCIO 3: SORTEO DE DECORACIONES (Cada 25 minutos) ---
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (!channel) return;

            // Cargamos la imagen ds.png desde la raíz del proyecto
            const fileSorteo = new AttachmentBuilder('./ds.png');

            const embedSorteo = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(
`# 🚨 SORTEO ACTIVO HASTA HOY 23:00 HS* 🚨

Todas las personas que suban una historia promocionando el servidor con el link de Discord invitando a venir a jugar, y además me etiqueten en Instagram **@oyoxxz8**, estarán participando automáticamente por **5 premios de decoraciones de Discord** 🎁✨

✅ La decoración es a elección: pueden elegir la que más les guste, sin importar cuál sea.

📌 **Para participar:**
* Subí una historia.
* Agregá el link del Discord.
* Invitá a la gente a venir a jugar.
* Etiquetame: **@oyoxxz8**

⏰ Tenés tiempo hasta las **23:00 HS de hoy**.

🍀 ¡Mucha suerte para todos!`
                )
                .setImage('attachment://ds.png');

            await channel.send({
                embeds: [embedSorteo],
                files: [fileSorteo]
            });

        } catch (error) {
            console.error('Error en el anuncio de 25 min (Sorteo):', error);
        }
    }, 1500000); // 25 minutos en milisegundos
});

client.login(TOKEN);