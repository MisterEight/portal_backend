const express = require("express");
const dotenv = require("dotenv");
const Sequelize = require('sequelize');
const sequelize = require('./src/config/database')
const unidadeRoutes = require('./src/routes/unidadeRoutes');
const licitacaoRoutes = require('./src/routes/licitacaoRoutes');
//const usuarioRoutes = require("./src/routes/usuariosRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api', unidadeRoutes);
app.use('/api/licitacao', licitacaoRoutes);
//app.use("/usuarios", usuarioRoutes);


sequelize.authenticate().then(function(){
    console.log("Sucesso ao conectar ao banco de dados!!")    
}).catch(function(error){
    console.log(`Erro ao conectar ao banco de dados${error}`)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

