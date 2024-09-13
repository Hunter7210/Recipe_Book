import mongoose from "mongoose";

const IngredienteSchema = new mongoose.Schema(
  {
    nomeIngrediente: {
      type: String,
      required: true,
    },
    quantIngrediente: {
      type: String,
      required: true,
    },
  },
  { _id: false }
); // `_id: false` para não criar um _id para cada ingrediente

const ReceitaSchema = new mongoose.Schema(
  {
    nomeReceita: {
      type: String,
      required: true,
    },
    descricaoReceita: {
      type: String,
    },
    categoriaReceita: {
      type: String,
      required: true,
    },
    modoPreparo: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    ingredientes: [IngredienteSchema], // Usando o subdocumento IngredienteSchema
    //avaliacao: [ // Descomente e ajuste se for usar no futuro
    //    {
    //        type: mongoose.Schema.Types.ObjectId,
    //        ref: 'Avaliacao',
    //    },
    //],
  },
  { timestamps: true }
); // Adiciona timestamps automáticos para criação e atualização

const Receita =
  mongoose.models.Receita || mongoose.model("Receita", ReceitaSchema);

export default Receita;
