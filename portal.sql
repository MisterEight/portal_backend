-- -----------------------------------------------------
-- Banco de Dados: portal_compras_publicas
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS portal_compras_publicas;
USE portal_compras_publicas;

-- -------------------------------
-- TABELA: usuarios
-- -------------------------------
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf CHAR(11) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------------
-- TABELA: compradores
-- -------------------------------
CREATE TABLE compradores (
    comprador_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    erp_utilizado VARCHAR(255),
    possui_power_bi BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------------
-- TABELA: unidades
-- -------------------------------
CREATE TABLE unidades (
    unidade_id INT AUTO_INCREMENT PRIMARY KEY,
    comprador_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    sigla VARCHAR(50),
    telefone VARCHAR(50),
    endereco VARCHAR(255),
    bairro VARCHAR(100),
    cep VARCHAR(20),
    uf CHAR(2),
    cidade VARCHAR(100),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (comprador_id) REFERENCES compradores(comprador_id)
);

-- TABELA: permissoes
-- -------------------------------
CREATE TABLE permissoes (
    permissao_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);


-- -------------------------------
-- TABELA: roles
-- -------------------------------
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

-- -------------------------------
-- TABELA: roles_permissoes
-- -------------------------------
CREATE TABLE roles_permissoes (
    role_id INT,
    permissao_id INT,
    PRIMARY KEY (role_id, permissao_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (permissao_id) REFERENCES permissoes(permissao_id)
);

-- -------------------------------
-- TABELA: usuarios_roles
-- -------------------------------
CREATE TABLE usuarios_roles (
    usuario_id INT,
    role_id INT,
    PRIMARY KEY (usuario_id, role_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- -------------------------------
-- TABELA: usuarios_unidades_permissoes
-- -------------------------------
CREATE TABLE usuarios_unidades_permissoes (
    usuario_id INT,
    unidade_id INT,
    permissao_id INT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, unidade_id, permissao_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY (unidade_id) REFERENCES unidades(unidade_id),
    FOREIGN KEY (permissao_id) REFERENCES permissoes(permissao_id)
);

-- -------------------------------
-- TABELA: licitacoes
-- -------------------------------
CREATE TABLE licitacoes (
    licitacao_id INT AUTO_INCREMENT PRIMARY KEY,
    comprador_id INT NOT NULL,
    pregoeiro_id INT NOT NULL,
    ordenador_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    natureza ENUM('Produto', 'Serviço') NOT NULL,
    status ENUM('RASCUNHO', 'PUBLICADA', 'CANCELADA') DEFAULT 'RASCUNHO',
    data_publicacao DATETIME NULL,
    ativa BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (comprador_id) REFERENCES compradores(comprador_id),
    FOREIGN KEY (pregoeiro_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY (ordenador_id) REFERENCES usuarios(usuario_id)
);

-- -------------------------------
-- TABELA: feriados
-- -------------------------------
CREATE TABLE feriados (
    feriado_id INT AUTO_INCREMENT PRIMARY KEY,
    data_feriado DATE NOT NULL,
    descricao VARCHAR(255),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -------------------------------
-- TABELA: grupos_documentos
-- -------------------------------
CREATE TABLE grupos_documentos (
    grupo_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- -------------------------------
-- TABELA: categorias_documentos
-- -------------------------------
CREATE TABLE categorias_documentos (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- -------------------------------
-- TABELA: documentos
-- -------------------------------
CREATE TABLE documentos (
    documento_id INT AUTO_INCREMENT PRIMARY KEY,
    grupo_id INT,
    categoria_id INT,
    titulo VARCHAR(255) NOT NULL,
    caminho_arquivo VARCHAR(500),
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (grupo_id) REFERENCES grupos_documentos(grupo_id),
    FOREIGN KEY (categoria_id) REFERENCES categorias_documentos(categoria_id)
);
-- -----------------------------------------------------
-- SEED DATA PARA RBAC
-- -----------------------------------------------------
-- Permissão administrativa inicial
INSERT INTO permissoes (nome, descricao) VALUES ('ADMIN', 'Acesso total ao sistema');

-- Cargos básicos
INSERT INTO roles (nome, descricao) VALUES
  ('ADMIN', 'Usuário administrador do portal'),
  ('COMPRADOR', 'Comprador'),
  ('UNIDADE', 'Unidade'),
  ('PREGOEIRO', 'Usuário pregoeiro');

-- Associa o cargo ADMIN à permissão ADMIN
INSERT INTO roles_permissoes (role_id, permissao_id)
  SELECT r.role_id, p.permissao_id FROM roles r, permissoes p
  WHERE r.nome='ADMIN' AND p.nome='ADMIN';

-- Primeiro usuário administrador
INSERT INTO usuarios (nome, login, email, cpf, senha_hash)
VALUES ('Administrador', 'admin', 'admin@example.com', '00000000000',
'$2a$10$7EqJtq98hPqEX7fNZaFWoOaWgWo9r2ZSG6rPJty2rc3hSx0bCXeFa');

-- Vincula o usuário administrador ao cargo ADMIN
INSERT INTO usuarios_roles (usuario_id, role_id)
  SELECT u.usuario_id, r.role_id FROM usuarios u, roles r
  WHERE u.login='admin' AND r.nome='ADMIN';
