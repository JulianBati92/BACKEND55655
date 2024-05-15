const authMiddleware = (req, res, next) => {
    
    // Verificar si el usuario está autenticado
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
  
  export { authMiddleware };