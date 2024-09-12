import Usuario from "@/models/Usuario";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    // Recebe os dados da requisição
    const { emailUsuario, senhaUsuario } = await request.json();

    // Estabelece a conexão com o banco de dados
    await connectMongo();

    // Procura um usuário no banco de dados com o email fornecido
    const usuario = await Usuario.findOne({ emailUsuario });

    if (!usuario) {
      // Retorna uma resposta JSON indicando que o usuário não foi encontrado
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se a senha fornecida corresponde à senha armazenada para o usuário
    const isPasswordValid = await usuario.comparePassword(senhaUsuario);

    if (!isPasswordValid) {
      // Retorna uma resposta JSON indicando que a senha está incorreta
      return NextResponse.json(
        { success: false, message: "Senha incorreta" },
        { status: 401 }
      );
    }

    // Cria um token JWT
    const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Retorna uma resposta JSON com o token
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json(
      { success: false, message: "Erro no servidor" },
      { status: 500 }
    );
  }
}
