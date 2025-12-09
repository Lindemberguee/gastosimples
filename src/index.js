const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoutes = require("./routes/health");
const notasRoutes = require("./routes/notas");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", healthRoutes);
app.use("/api", notasRoutes);

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
});
