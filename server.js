const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');

const unidadeRoutes = require('./src/routes/unidadeRoutes');
const licitacaoRoutes = require('./src/routes/licitacaoRoutes');
const compradoresRoutes = require('./src/routes/compradoresRoutes');
const loginRoutes = require('./src/routes/loginRoutes'); // ← login
const feriadosRoutes = require('./src/routes/feriadosRoutes');
const usuarioRoutes = require('./src/routes/usuariosRoutes'); // ← usuários protegidos

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', unidadeRoutes);
app.use('/api/licitacao', licitacaoRoutes);
app.use('/api/compradores', compradoresRoutes);
app.use('/api/login', loginRoutes); // ← agora é /api/login
app.use('/api/feriadosRoutes', feriadosRoutes);
app.use('/api/usuarios', usuarioRoutes);

sequelize.authenticate().then(() => {
  console.log("Sucesso ao conectar ao banco de dados!!");
}).catch((error) => {
  console.log(`Erro ao conectar ao banco de dados: ${error}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
