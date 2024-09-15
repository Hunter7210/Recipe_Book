//Criado as rotas para o minhas receitas
import jwt from "jsonwebtoken"; // Importa o pacote jsonwebtoken
import dbConnect from "@/utils/dbConnect";
import Receita from "@/models/Receita";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  // Conecte-se ao banco de dados
  await dbConnect();

  // Obtendo o cabeçalho de autorização
  const authHeader = req.headers.get("authorization");

  // Verifique se o cabeçalho de autorização está presente e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ message: "Acesso negado" }), {
      status: 401,
    });
  }

  // Extraia o token do cabeçalho de autorização
  console.log(req);
  const token = authHeader.split(" ")[1]; // Pega o token após "Bearer "
  console.log(token);
  console.log("JWT Secret:", process.env.JWT_SECRET);

  try {
    // Decodifique o token para obter o userId
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Verifique o conteúdo do token decodificado

    if (!decoded || !decoded.id) {
      return new Response(
        JSON.stringify({ message: "Token inválido ou expirado" }),
        { status: 401 }
      );
    }

    // Busque as receitas do usuário autenticado
    const receitas = await Receita.find({ userId: decoded.id });

    return new Response(JSON.stringify(receitas), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Erro ao buscar as receitas",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  console.log(authHeader); // Corrigido o erro de sintaxe aqui

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Errooooo");
    return new Response(JSON.stringify({ message: "Acesso negado" }), {
      status: 401,
    });
  }
  console.log(req);
  const token = authHeader.split(" ")[1]; // Pega o token após "Bearer "
  console.log(token);
  console.log("JWT Secret:", process.env.JWT_SECRET);

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Verifique o conteúdo do token decodificado

    const {
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      ingredientes,
    } = await req.json();

    await dbConnect();

    const novaReceita = new Receita({
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      ingredientes,
      userId: decoded.id, // Vincula ao usuário autenticado, ajuste para o campo correto
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
      JSON.stringify({ message: "Erro de autenticação", error: error.message }),
      {
        status: 401,
      }
    );
  }
}

export async function PUT(req) {
  await dbConnect();

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ message: "Acesso negado" }), {
      status: 401,
    });
  }

  const token = authHeader.split(" ")[1];
  const {
    receitaId,
    nomeReceita,
    descricaoReceita,
    categoriaReceita,
    modoPreparo,
    ingredientes,
  } = await req.json();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const receita = await Receita.findOne({
      _id: receitaId,
      userId: decoded.id,
    });

    if (!receita) {
      return new Response(
        JSON.stringify({ message: "Receita não encontrada" }),
        {
          status: 404,
        }
      );
    }

    receita.nomeReceita = nomeReceita || receita.nomeReceita;
    receita.descricaoReceita = descricaoReceita || receita.descricaoReceita;
    receita.categoriaReceita = categoriaReceita || receita.categoriaReceita;
    receita.modoPreparo = modoPreparo || receita.modoPreparo;
    receita.ingredientes = ingredientes || receita.ingredientes;

    await receita.save();

    return new Response(
      JSON.stringify({ message: "Receita atualizada com sucesso" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Erro ao atualizar a receita",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await dbConnect();

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ message: "Acesso negado" }), {
      status: 401,
    });
  }

  const token = authHeader.split(" ")[1];
  const { receitaId } = await req.json();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const receita = await Receita.findOne({
      _id: receitaId,
      userId: decoded.id,
    });

    if (!receita) {
      return new Response(
        JSON.stringify({ message: "Receita não encontrada" }),
        {
          status: 404,
        }
      );
    }

    await Receita.deleteOne({ _id: receitaId });

    return new Response(
      JSON.stringify({ message: "Receita excluída com sucesso" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Erro ao excluir a receita",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
