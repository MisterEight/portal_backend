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
    usuarios_roles_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    role_id INT,
    comprador_id INT DEFAULT NULL,
    unidade_id INT DEFAULT NULL,
    UNIQUE KEY uq_usuario_role_escopo (usuario_id, role_id, comprador_id, unidade_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (comprador_id) REFERENCES compradores(comprador_id),
    FOREIGN KEY (unidade_id) REFERENCES unidades(unidade_id)
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
'$2a$12$0.M8noZO8FDNTCv9QRbMjeFeEWpFr1MKCuVLn7aXKlKQ39GRDivve');

-- Vincula o usuário administrador ao cargo ADMIN
INSERT INTO usuarios_roles (usuario_id, role_id, comprador_id, unidade_id)
  SELECT u.usuario_id, r.role_id, NULL, NULL FROM usuarios u, roles r
  WHERE u.login='admin' AND r.nome='ADMIN';

-- Dados de exemplo para testes
INSERT INTO compradores (nome) VALUES ('GDF');

INSERT INTO unidades (comprador_id, nome, sigla) VALUES
  (1, 'Saude', 'SAU'),
  (1, 'Educacao', 'EDU');

INSERT INTO usuarios (nome, login, email, cpf, senha_hash) VALUES
  ('Comprador User', 'comprador', 'comprador@example.com', '11111111111', '$2a$12$0.M8noZO8FDNTCv9QRbMjeFeEWpFr1MKCuVLn7aXKlKQ39GRDivve'),
  ('Unidade User', 'unidade', 'unidade@example.com', '22222222222', '$2a$12$0.M8noZO8FDNTCv9QRbMjeFeEWpFr1MKCuVLn7aXKlKQ39GRDivve'),
  ('Pregoeiro User', 'pregoeiro', 'pregoeiro@example.com', '33333333333', '$2a$12$0.M8noZO8FDNTCv9QRbMjeFeEWpFr1MKCuVLn7aXKlKQ39GRDivve');

INSERT INTO usuarios_roles (usuario_id, role_id, comprador_id, unidade_id) VALUES
  ((SELECT usuario_id FROM usuarios WHERE login='comprador'), (SELECT role_id FROM roles WHERE nome='COMPRADOR'), 1, NULL),
  ((SELECT usuario_id FROM usuarios WHERE login='unidade'), (SELECT role_id FROM roles WHERE nome='UNIDADE'), 1, 1),
  ((SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT role_id FROM roles WHERE nome='PREGOEIRO'), 1, 1);

-- Seeds de licitações para testes de relatório
INSERT INTO licitacoes (comprador_id, pregoeiro_id, ordenador_id, titulo, natureza, status, data_publicacao, ativa) VALUES
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 01/2023', 'Produto', 'PUBLICADA', '2023-01-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 02/2023', 'Serviço', 'PUBLICADA', '2023-02-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 03/2023', 'Produto', 'PUBLICADA', '2023-03-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 04/2023', 'Serviço', 'PUBLICADA', '2023-04-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 05/2023', 'Produto', 'PUBLICADA', '2023-05-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 06/2023', 'Serviço', 'PUBLICADA', '2023-06-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 07/2023', 'Produto', 'PUBLICADA', '2023-07-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 08/2023', 'Serviço', 'PUBLICADA', '2023-08-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 09/2023', 'Produto', 'PUBLICADA', '2023-09-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 10/2023', 'Serviço', 'PUBLICADA', '2023-10-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 11/2023', 'Produto', 'PUBLICADA', '2023-11-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 12/2023', 'Serviço', 'PUBLICADA', '2023-12-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 01/2024', 'Produto', 'PUBLICADA', '2024-01-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 02/2024', 'Serviço', 'PUBLICADA', '2024-02-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 03/2024', 'Produto', 'PUBLICADA', '2024-03-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 04/2024', 'Serviço', 'PUBLICADA', '2024-04-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 05/2024', 'Produto', 'PUBLICADA', '2024-05-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 06/2024', 'Serviço', 'PUBLICADA', '2024-06-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 07/2024', 'Produto', 'PUBLICADA', '2024-07-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 08/2024', 'Serviço', 'PUBLICADA', '2024-08-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 09/2024', 'Produto', 'PUBLICADA', '2024-09-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 10/2024', 'Serviço', 'PUBLICADA', '2024-10-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 11/2024', 'Produto', 'PUBLICADA', '2024-11-05', TRUE),
  (1, (SELECT usuario_id FROM usuarios WHERE login='pregoeiro'), (SELECT usuario_id FROM usuarios WHERE login='comprador'), 'Licitacao 12/2024', 'Serviço', 'PUBLICADA', '2024-12-05', TRUE);
