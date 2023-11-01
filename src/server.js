const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const supabaseUrl = 'https://pvgsasoytbxikvjflsnm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Z3Nhc295dGJ4aWt2amZsc25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODc5MDQ3OSwiZXhwIjoyMDE0MzY2NDc5fQ.xWY6UtGVE_czaHyfBffbyvTyX0QZtVAKmaLiVvonZcA';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json());

// Rota para obter todos os presentes
app.get('/presentes', async (req, res) => {
  let { data, error } = await supabase.from('Produtos').select('*');
  console.log('data',data)
  if (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
    return;
  }
  res.json(data);
});

// Rota para criar um novo presente
app.post('/presentes', async (req, res) => {
  const { urlFoto, urlProduto, nomeProduto, comprado } = req.body;
  const { data, error } = await supabase.from('Produtos').upsert([
    {
      urlFoto,
      urlProduto,
      nomeProduto,
      comprado,
    },
  ]);
  if (error) {
    console.error('Erro ao criar presente:', error);
    res.status(500).json({ error: 'Erro ao criar presente' });
    return;
  }
  res.json(data[0]);
});

// Rota para atualizar um presente
app.put('/presentes/:id', async (req, res) => {
  const { id } = req.params;
  const { urlFoto, urlProduto, nomeProduto, comprado } = req.body;
  console.log(req)
  const { data, error } = await supabase.from('Produtos').upsert([
    {
      id: parseInt(id),
      urlFoto,
      urlProduto,
      nomeProduto,
      comprado,
    },
  ]);
  if (error) {
    console.error('Erro ao atualizar presente:', error);
    res.status(500).json({ error: 'Erro ao atualizar presente' });
    return;
  }
  res.json(data);
});

// Rota para deletar um presente
app.delete('/presentes/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('Produtos').delete().eq('id', parseInt(id));
  if (error) {
    console.error('Erro ao deletar presente:', error);
    res.status(500).json({ error: 'Erro ao deletar presente' });
    return;
  }
  res.json({ message: 'Presente deletado com sucesso.' });
});

app.listen(3000, () => {
  console.log('Servidor está ouvindo na porta 3000');
});
