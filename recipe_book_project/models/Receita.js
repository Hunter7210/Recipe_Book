//Criando o Model da minha Receita

import mongoose from "mongoose";

//Criando um Schema de ingrediente
const ingredienteSchema = new mongoose.Schema({
  nomeIngred: { type: String, required: true },
  qtdIngred: { type: String, required: true },
});

//Criando um Schema de receita
const receitaSchema = new mongoose.Schema(
  {
    nomeReceita: { type: String, required: true },
    descricaoReceita: { type: String, required: true },
    categoriaReceita: { type: String, required: true },
    modoPreparo: { type: String, required: true },
    ingredientes: [ingredienteSchema], // Array de ingredientes
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // Referência ao modelo Usuario
      required: true,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
  }
);

export default mongoose.models.Receita ||
  mongoose.model("Receita", receitaSchema);
