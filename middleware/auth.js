import jwt from 'jsonwebtoken';

const auth = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Access denied" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret");
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default auth;
