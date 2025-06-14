# portal_backend

Este reposit\u00f3rio cont\u00e9m a API do Portal de Compras P\u00fablicas.

## Requisitos

- Node.js
- Docker e Docker Compose para o banco de dados

## Configura\u00e7\u00e3o e execu\u00e7\u00e3o

1. Clone o reposit\u00f3rio e instale as depend\u00eancias:

   ```bash
   git clone <repo>
   cd portal_backend
   npm install
   ```

2. Crie um arquivo `.env` na raiz com as vari\u00e1veis abaixo (ajuste conforme seu ambiente):

   ```env
   PORT=3000
   DB_NAME=portal_compras_publicas
   DB_USER=root
   DB_PASSWORD=senha
   DB_HOST=localhost
   DB_PORT=3306
   DB_DIALECT=mysql
   SECRET_KEY=segredo
   EMAIL_FROM=seu-email@gmail.com
   EMAIL_PASS=sua-senha
   FRONTEND_URL=http://localhost:3000
   ```

3. Inicie o banco de dados MySQL com o `docker-compose` (o script `portal.sql` ser\u00e1 carregado automaticamente):

   ```bash
   docker-compose up -d
   ```

4. Execute a aplica\u00e7\u00e3o:

   ```bash
   npm start
   ```

A API ficar\u00e1 dispon\u00edvel na porta configurada (padr\u00e3o `3000`).
