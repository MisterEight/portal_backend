const Comprador = require('../models/Comprador');
const Unidade = require('../models/Unidade');
const Usuario = require('../models/Usuarios');
const Licitacao = require('../models/Licitacao');
const UsuarioRole = require('../models/UsuarioRole');

exports.getDashboard = async (req, res) => {
  try {
    const { id, roles } = req.user;

    const isSuperAdmin = roles.some(r => r.nome === 'ADMIN' && !r.comprador_id && !r.unidade_id);
    if (isSuperAdmin) {
      const [compradores, unidades, usuarios, licitacoes] = await Promise.all([
        Comprador.count(),
        Unidade.count(),
        Usuario.count(),
        Licitacao.count()
      ]);
      return res.status(200).json({ compradores, unidades, usuarios, licitacoes });
    }

    const adminCompradores = roles.filter(r => r.nome === 'ADMIN' && r.comprador_id && !r.unidade_id).map(r => r.comprador_id);
    if (adminCompradores.length) {
      const [unidades, licitacoes, usuarios] = await Promise.all([
        Unidade.count({ where: { comprador_id: adminCompradores } }),
        Licitacao.count({ where: { comprador_id: adminCompradores } }),
        UsuarioRole.count({ distinct: true, col: 'usuario_id', where: { comprador_id: adminCompradores } })
      ]);
      return res.status(200).json({ compradores: adminCompradores.length, unidades, usuarios, licitacoes });
    }

    const adminUnidades = roles.filter(r => r.nome === 'ADMIN' && r.unidade_id).map(r => r.unidade_id);
    if (adminUnidades.length) {
      const unidades = await Unidade.findAll({ attributes: ['unidade_id', 'comprador_id'], where: { unidade_id: adminUnidades } });
      const compradorIds = [...new Set(unidades.map(u => u.comprador_id))];
      const [licitacoes, usuarios] = await Promise.all([
        Licitacao.count({ where: { comprador_id: compradorIds } }),
        UsuarioRole.count({ distinct: true, col: 'usuario_id', where: { unidade_id: adminUnidades } })
      ]);
      return res.status(200).json({ unidades: adminUnidades.length, usuarios, licitacoes });
    }

    const pregoeiro = roles.some(r => r.nome === 'PREGOEIRO');
    if (pregoeiro) {
      const licitacoes = await Licitacao.count({ where: { pregoeiro_id: id } });
      return res.status(200).json({ licitacoes });
    }

    return res.status(200).json({ message: 'Nenhum dado disponível para este usuário' });
  } catch (error) {
    console.error('Erro ao gerar dashboard:', error);
    res.status(500).json({ error: 'Erro ao gerar dashboard' });
  }
};
