const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Licitacao = sequelize.define('Licitacao', {
  licitacao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comprador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: 'comprador_id é obrigatório' },
      isInt: { msg: 'comprador_id deve ser um número inteiro' }
    }
  },
  pregoeiro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: 'pregoiero_id é obrigatório' },
      isInt: { msg: 'pregoiero_id deve ser um número inteiro' }
    }
  },
  ordenador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: 'ordenador_id é obrigatório' },
      isInt: { msg: 'ordenador_id deve ser um número inteiro' }
    }
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'titulo é obrigatório' },
      notEmpty: { msg: 'titulo não pode estar vazio' }
    }
  },
  natureza: {
    type: DataTypes.ENUM('Produto', 'Serviço'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['Produto', 'Serviço']],
        msg: 'natureza deve ser "Produto" ou "Serviço"'
      },
      notNull: { msg: 'natureza é obrigatório' }
    }
  },
  status: {
    type: DataTypes.ENUM('RASCUNHO', 'PUBLICADA', 'CANCELADA'),
    allowNull: false,
    defaultValue: 'RASCUNHO',
    validate: {
      isIn: {
        args: [['RASCUNHO', 'PUBLICADA', 'CANCELADA']],
        msg: 'status inválido'
      },
      notNull: { msg: 'status é obrigatório' }
    }
  },
  data_publicacao: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: { msg: 'data_publicacao deve ser uma data válida' }
    }
  },
  ativa: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'licitacoes',
  timestamps: false,
  hooks: {
    beforeUpdate: (licitacao) => {
      licitacao.data_atualizacao = new Date();
    }
  }
});

module.exports = Licitacao;
