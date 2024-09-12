import jwt from "jsonwebtoken"; // Importa o módulo `jsonwebtoken` para manipulação de JWTs

// Exporta o middleware `jwtMiddleware`, que recebe um `handler` como argumento
export const jwtMiddleware = (handler) => async (req, res) => {
  // Obtém o token do cabeçalho de autorização (assumindo formato 'Bearer <token>')
  const token = req.headers.authorization?.split(" ")[1]; // Extrai o token do cabeçalho

  // Verifica se o token está presente
  if (!token) {
    // Se o token não estiver presente, retorna status 401 (Não Autorizado) com uma mensagem de erro
    return res.status(401).json({ message: "Token ausente ou inválido" });
  }

  try {
    // Verifica e decodifica o token usando a chave secreta armazenada em `process.env.JWT_SECRET`
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token para obter os dados do usuário
    req.user = decoded; // Armazena os dados decodificados do usuário no objeto `req`
    // Continua para o próximo handler, agora que a autenticação foi verificada
    return handler(req, res); // Chama o próximo handler com a requisição e resposta
  } catch (error) {
    // Se ocorrer um erro na verificação do token (token inválido ou expirado)
    // Retorna status 401 (Não Autorizado) com uma mensagem de erro
    return res.status(401).json({ message: "Token inválido" });
  }
};
