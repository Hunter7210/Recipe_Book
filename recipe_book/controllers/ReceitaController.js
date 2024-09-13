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


export const addReceita = async (req) => {
  await connectMongo();

  try {
    const {
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      ingredientes,
    } = await req.json();

    // Cria uma nova receita
    const novaReceita = new Receita({
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      ingredientes,
      userId: req.user.userId, // Assumindo que você tem um usuário autenticado
    });

    // Salva a receita no banco de dados
    const receitaSalva = await novaReceita.save();

    // Retorna a receita criada
    return { receita: receitaSalva };
  } catch (error) {
    throw new Error(error.message);
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
