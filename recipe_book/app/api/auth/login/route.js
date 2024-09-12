import Usuario from "@/models/Usuario"; // Importa o modelo de Usuário, que define o esquema e as operações para a coleção de usuários no MongoDB
import connectMongo from "@/utils/dbConnect"; // Importa a função de conexão com o MongoDB, garantindo que a conexão seja estabelecida antes de realizar operações no banco
import { NextResponse } from "next/server"; // Importa NextResponse para criar respostas HTTP no Next.js
import jwt from "jsonwebtoken"; // Importa o JWT (JSON Web Token) para gerar e verificar tokens de autenticação

// Função assíncrona para tratar requisições POST no endpoint de autenticação
export async function POST(request) {
  // Recebe os dados da requisição, que devem incluir o email e a senha do usuário
  const { emailUsuario, senhaUsuario } = await request.json();

  // Estabelece a conexão com o banco de dados MongoDB
  await connectMongo();

  try {
    // Procura um usuário no banco de dados com o email fornecido
    const usuario = await Usuario.findOne({ emailUsuario });

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      // Retorna uma resposta JSON indicando que o usuário não foi encontrado e um status HTTP 400 (Bad Request)
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado" },
        { status: 400 }
      );
    }

    // Verifica se a senha fornecida corresponde à senha armazenada para o usuário
    const isPasswordValid = await usuario.comparePassword(senhaUsuario);

    // Se a senha não for válida
    if (!isPasswordValid) {
      // Retorna uma resposta JSON indicando que a senha está incorreta e um status HTTP 400 (Bad Request)
      return NextResponse.json(
        { success: false, message: "Senha incorreta" },
        { status: 400 }
      );
    }

    // Cria um token JWT que contém o ID do usuário, que será usado para autenticação em requisições futuras
    const token = jwt.sign(
      { _id: usuario._id }, // Inclui o ID do usuário no payload do token
      process.env.JWT_SECRET, // Chave secreta para assinar o token, armazenada nas variáveis de ambiente
      { expiresIn: "1h" } // Define o tempo de expiração do token como 1 hora
    );

    // Retorna uma resposta JSON contendo o token de autenticação e um status HTTP 200 (OK)
    return NextResponse.json({ success: true, token });
  } catch (error) {
    // Em caso de erro, retorna uma resposta JSON indicando que houve um erro no servidor e um status HTTP 500 (Internal Server Error)
    return NextResponse.json(
      { success: false, message: "Erro no servidor" },
      { status: 500 }
    );
  }
}
