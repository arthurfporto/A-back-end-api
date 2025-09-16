import express from "express";      // Requisição do pacote do express
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();         // Carrega e processa o arquivo .env
const { Pool } = pkg;    // Utiliza a Classe Pool do Postgres


const app = express();              // Instancia o Express
const port = 3000;                  // Define a porta

app.get("/", async (req, res) => {        // Requisição Cria a rota da raiz do projeto
  console.log("Rota GET / solicitada");

  const db = new Pool({
    connectionString: process.env.URL_BD,
  });

  let dbStatus = "ok";
  try {
    await db.query("SELECT 1");
  } catch (e) {
    dbStatus = e.message;
  }

  res.json({
    message: "API para Distribuição de Bombons",      // Substitua pelo conteúdo da sua API
    author: "Arthur",    // Substitua pelo seu nome
    statusBD: dbStatus
  });
});

app.listen(port, () => {            // Um socket para "escutar" as requisições
  console.log(`Serviço rodando na porta:  ${port}`);
});