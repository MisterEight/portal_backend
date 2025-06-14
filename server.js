const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const Sequelize = require('sequelize');
const sequelize = require('./src/config/database');
require('./src/models');
const unidadeRoutes = require('./src/routes/unidadeRoutes');
const licitacaoRoutes = require('./src/routes/licitacaoRoutes');
const compradoresRoutes = require('./src/routes/compradoresRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const registerRoutes = require('./src/routes/registerRoutes');
const feriadosRoutes = require('./src/routes/feriadosRoutes');
const usuarioRoutes = require('./src/routes/usuariosRoutes');
const recuperacaoRoutes = require('./src/routes/recuperacaoRoutes');
const rolesRoutes = require('./src/routes/rolesRoutes');
const usuarioRoleRoutes = require('./src/routes/usuarioRoleRoutes');
const permissoesRoutes = require('./src/routes/permissoesRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const documentosRoutes = require('./src/routes/documentosRoutes');
const authenticateToken = require('./src/middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/arquivos', express.static('uploads'));
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);

app.use(authenticateToken);

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/usuarios', usuarioRoleRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/permissoes', permissoesRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/unidade', unidadeRoutes);
app.use('/api/licitacao', licitacaoRoutes);
app.use('/api/compradores', compradoresRoutes);
app.use('/api/feriadosRoutes', feriadosRoutes);
app.use('/api', recuperacaoRoutes);
app.use('/api/documentos', documentosRoutes);


sequelize.authenticate().then(function(){
    console.log("Sucesso ao conectar ao banco de dados!!")    
}).catch(function(error){
    console.log(`Erro ao conectar ao banco de dados${error}`)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
