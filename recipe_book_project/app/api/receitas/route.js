//Criado as rotas para o minhas receitas

import dbConnect from "@/utils/dbConnect";
import Receita from "@/models/Receita";
import { getToken } from "next-auth/jwt";

export async function GET() {
  await dbConnect();

  try {
    const receitas = await Receita.find().populate("userId", "nome email"); //O metodo populate traz os detalhes do usuário (nome e e-mail) associados à receita.

    return new Response(JSON.stringify(receitas), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao buscar as receitas" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ message: "Acesso negado" }), {
      status: 401,
    });
  }

  const {
    nomeReceita,
    descricaoReceita,
    categoriaReceita,
    modoPreparo,
    ingredientes,
  } = await req.json();

  await dbConnect();

  try {
    const novaReceita = new Receita({
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      ingredientes,
      userId: token._id, // Vincula a receita ao usuário autenticado
    });

    await novaReceita.save();

    return new Response(
      JSON.stringify({ message: "Receita criada com sucesso" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao criar a receita" }),
      {
        status: 500,
      }
    );
  }
}
