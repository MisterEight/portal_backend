module.exports = (requiredRole) => {
  return (req, res, next) => {
    const roles = (req.user && req.user.roles) || [];
    const isSuperAdmin = roles.some(r => r.nome === 'ADMIN' && !r.comprador_id && !r.unidade_id);
    if (isSuperAdmin) {
      return next();
    }
    const recursoComprador = req.body.comprador_id || req.params.comprador_id;
    const recursoUnidade = req.body.unidade_id || req.params.unidade_id || req.params.id;

    const allowed = roles.some(r => {
      if (r.nome !== requiredRole) return false;
      if (r.comprador_id && recursoComprador && r.comprador_id !== Number(recursoComprador)) {
        return false;
      }
      if (r.unidade_id && recursoUnidade && r.unidade_id !== Number(recursoUnidade)) {
        return false;
      }
      return true;
    });

    if (!allowed) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
};
