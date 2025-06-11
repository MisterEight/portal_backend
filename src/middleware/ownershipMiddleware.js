const Permissao = require('../models/Permissao');
const UsuarioUnidadePermissao = require('../models/UsuarioUnidadePermissao');

module.exports = (permissao) => {
  return async (req, res, next) => {
    if (req.user && req.user.roles && req.user.roles.includes('ADMIN')) {
      return next();
    }

    const permissaoRecord = await Permissao.findOne({ where: { nome: permissao } });
    if (!permissaoRecord) {
      return res.status(403).json({ message: 'Permissão não encontrada' });
    }

    const unidadeId = req.params.unidadeId || req.params.id || req.body.unidade_id;
    if (!unidadeId) {
      return res.status(400).json({ message: 'Unidade não especificada' });
    }

    const mapping = await UsuarioUnidadePermissao.findOne({
      where: {
        usuario_id: req.user.id,
        unidade_id: unidadeId,
        permissao_id: permissaoRecord.permissao_id
      }
    });

    if (!mapping) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    next();
  };
};

