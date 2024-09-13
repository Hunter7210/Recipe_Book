import Receita from "@/models/Receita";
import connectMongo from "@/utils/dbConnect";

// Carregar as receitas do usuário
export const getReceita = async (req) => {
  await connectMongo();
  try {
    const receitas = await Receita.find({ userId: req.user.userId });
    return new Response(JSON.stringify({ receitas }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
export const adicionarReceita = async (req) => {
  await connectMongo();

  try {
    const {
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      ingredientes,
    } = await req.json();

    // Validação básica
    if (
      !nomeReceita ||
      !categoriaReceita ||
      !modoPreparo ||
      !ingredientes ||
      ingredientes.length === 0
    ) {
      return new Response(
        JSON.stringify({
          error: "Todos os campos obrigatórios devem ser preenchidos.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Log para depuração
    console.log("Dados da receita recebidos:", {
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      ingredientes,
    });

    // Criação de uma nova receita
    const novaReceita = new Receita({
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      userId: req.user.userId, // Obtendo o userId do usuário autenticado
      ingredientes,
    });

    // Salvando a nova receita no banco de dados
    await novaReceita.save();

    return new Response(
      JSON.stringify({
        message: "Receita criada com sucesso!",
        receita: novaReceita,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao adicionar receita:", error); // Log detalhado do erro

    return new Response(
      JSON.stringify({
        error: "Erro ao criar a receita. Verifique os logs do servidor.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
// Atualizar Receita
export const updateReceita = async (req, res) => {
  const { id } = req.query;
  const data = req.body;
  await connectMongo();

  try {
    const updatedReceita = await Receita.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { $set: data }, // Use $set para atualizar apenas os campos fornecidos
      { new: true }
    );

    if (!updatedReceita) {
      return res.status(404).json({ message: "Receita não encontrada" });
    }

    res.status(200).json({ receita: updatedReceita });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar receita" });
  }
};

// Deletar Receita
export const deleteReceita = async (req, res) => {
  const { id } = req.query;
  await connectMongo();

  try {
    const deletedReceita = await Receita.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!deletedReceita) {
      return res.status(404).json({ message: "Receita não encontrada" });
    }

    res.status(200).json({ message: "Receita deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar receita" });
  }
};
