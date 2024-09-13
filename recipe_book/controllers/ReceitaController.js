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

// Criar Receita
export const addReceita = async (req, res) => {
  const {
    nomeReceita,
    descricaoReceita,
    categoriaReceita,
    modoPreparo,
    ingredientes, // Espera-se um array de ingredientes
  } = req.body;

  await connectMongo();

  try {
    // Certifique-se de que ingredientes é um array de objetos
    if (
      !Array.isArray(ingredientes) ||
      ingredientes.some((ing) => !ing.nomeIngrediente || !ing.quantIngrediente)
    ) {
      return res
        .status(400)
        .json({ message: "Dados de ingredientes inválidos" });
    }

    const newReceita = new Receita({
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      userId: req.user._id, // Associa a receita ao usuário logado
      ingredientes, // Passa os ingredientes para o modelo Receita
    });

    await newReceita.save();

    res.status(201).json({ receita: newReceita });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar receita" });
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
