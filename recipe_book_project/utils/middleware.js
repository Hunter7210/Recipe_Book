/* // middleware/verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.get("authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ message: "Token é necessário" }), {
      status: 403,
    });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Adiciona o id do usuário ao req
    next();
  } catch (error) {
    return new Response(JSON.stringify({ message: "Token inválido" }), {
      status: 401,
    });
  }
};
 */