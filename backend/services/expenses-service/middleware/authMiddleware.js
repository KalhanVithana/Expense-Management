
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    
    return res.status(401).json({ message: "Unauthorized" });
  const token = authHeader.split(" ")[1];
       console.log("authHeader",token,process.env.ACCESS_TOKEN_SECRET);
  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  
    req.user = decoded;
    next();
  } catch (err) {
     console.log("authHeader",err);
    return res.status(403).json({ message: "Invalid token" });
  }
};
