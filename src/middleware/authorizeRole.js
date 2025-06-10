module.exports = function (...allowed) {
  return (req, res, next) => {
    const userRoles = (req.user && req.user.roles) || [];
    const ok = allowed.some(role => userRoles.includes(role));
    if (!ok) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
};
