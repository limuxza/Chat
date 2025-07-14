const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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";

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 200
    }, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Erro ao se conectar à OpenAI" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
