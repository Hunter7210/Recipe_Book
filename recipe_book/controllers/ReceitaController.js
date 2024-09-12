//Realização do CRUD

import Receita from "@/models/Receita";
import connectMongo from "@/utils/dbConnect";

//carregar as receitas do usuario
export const getReceita = async (req, res) => {
  await connectMongo();
  try {
    const receita = await Receita.find({ userId: req.usuario.userId });
    res.status(200).json({ receita });
  } catch (error) {
    res.status(500).json({ error });
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
    if (!Array.isArray(ingredientes) || ingredientes.some(ing => !ing.nomeIngrediente || !ing.quantIngrediente)) {
      return res.status(400).json({ message: "Dados de ingredientes inválidos" });
    }

    const newReceita = new Receita({
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      // userId: req.usuario.userId, // Associa a receita ao usuário logado
      ingredientes, // Passa os ingredientes para o modelo Receita
    });

    await newReceita.save();
    res.status(201).json({ receita: newReceita });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar receita" });
  }
};


//Atualizar Receita
export const updateReceita = async (req, res) => {
  const { id } = req.query;
  const data = req.body;
  await connectMongo();

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { data },
      { new: true }
    );
    if (!updatedTodo)
      return res.status(404).json({
        message: "Tarefa não encontrada",
      });
    res.status(200).json({ todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar tarefa" });
  }
};

// delete Tarefa
export const deleteTodo = async (req, res) => {
  const { id } = req.query;
  await connectMongo();

  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    if (!deletedTodo)
      return res.status(404).json({
        message: "Tarefa não encontrada",
      });
    res.status(200).json({
      message: "Tarefa deletada com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao deletar tarefa",
    });
  }
};
