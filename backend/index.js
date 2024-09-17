require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 8800;

const app = express();

app.use(cors({ credentials: true, origin: "*" }));

app.use(express.json());

const noteRoutes = require("./routes/NoteRoutes");

app.use("/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
