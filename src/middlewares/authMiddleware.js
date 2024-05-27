const verifyUserRole = (roles) => {
  return (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Verificar si el usuario tiene uno de los roles permitidos
    const userRole = req.user.role;
    if (roles.includes(userRole)) {
      return next();
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  };
};

export { verifyUserRole };
