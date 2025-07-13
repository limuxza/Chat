const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;

app.post("/gerar", async (req, res) => {
    const prompt = req.body.pergunta;

    try {
        const resposta = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: prompt }
            ]
        }, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        res.json({
            resultado: resposta.data.choices[0].message.content
        });

    } catch (e) {
        res.status(500).json({ erro: e.response?.data || e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});