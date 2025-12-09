const express = require("express");
const multer = require("multer");
const upload = multer();
const { analisarNota } = require("../services/openai");

const router = express.Router();

router.post("/analisar-nota", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Envie uma imagem ou PDF." });
    }

    console.log("📄 Arquivo recebido:", req.file.originalname);

    const resultado = await analisarNota(req.file.buffer);

    res.json(resultado);
  } catch (e) {
    console.error("❌ Erro ao analisar nota:", e);
    res.status(500).json({ error: "Erro ao analisar nota" });
  }
});

module.exports = router;
