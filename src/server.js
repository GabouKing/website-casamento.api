const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(bodyParser.json());

// Rota para obter todos os presentes
app.get('/presentes', async (req, res) => {
  const presentes = await prisma.presente.findMany();
  res.json(presentes);
});

// Rota para criar um novo presente
app.post('/presentes', async (req, res) => {
  const { urlFoto, urlProduto, nomeProduto, comprado } = req.body;
  const presente = await prisma.presente.create({
    data: {
      urlFoto,
      urlProduto,
      nomeProduto,
      comprado,
    },
  });
  res.json(presente);
});

// Rota para atualizar um presente
app.put('/presentes/:id', async (req, res) => {
  const { id } = req.params;
  const { urlFoto, urlProduto, nomeProduto, comprado } = req.body;
  const updatedPresente = await prisma.presente.update({
    where: { id: parseInt(id) },
    data: { urlFoto, urlProduto, nomeProduto, comprado },
  });
  res.json(updatedPresente);
});

// Rota para deletar um presente
app.delete('/presentes/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.presente.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Presente deletado com sucesso.' });
});

app.listen(3000, () => {
  console.log('Servidor está ouvindo na porta 3000');
});
