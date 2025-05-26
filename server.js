const express = require("express");
const dotenv = require("dotenv");
const Sequelize = require('sequelize');
const sequelize = require('./src/config/database')
const unidadeRoutes = require('./src/routes/unidadeRoutes');
const licitacaoRoutes = require('./src/routes/licitacaoRoutes');
const compradoresRoutes = require('./src/routes/compradoresRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const feriadosRoutes = require('./src/routes/feriadosRoutes');
const usuarioRoutes = require('./src/routes/usuariosRoutes');
const recuperacaoRoutes = require('./src/routes/recuperacaoRoutes');

const usuariosRoutes = require("./src/routes/usuariosRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/unidade', unidadeRoutes);
app.use('/api/licitacao', licitacaoRoutes);
app.use('/api/compradores', compradoresRoutes);
<<<<<<< HEAD
app.use('/api/login', loginRoutes); 
app.use('/api/feriadosRoutes', feriadosRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api', recuperacaoRoutes);
app.use('/api/loginRoutes', loginRoutes);
app.use('/api/feriadosRoutes', feriadosRoutes);
app.use("/api/usuarios", usuariosRoutes);


sequelize.authenticate().then(function(){
    console.log("Sucesso ao conectar ao banco de dados!!")    
}).catch(function(error){
    console.log(`Erro ao conectar ao banco de dados${error}`)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

