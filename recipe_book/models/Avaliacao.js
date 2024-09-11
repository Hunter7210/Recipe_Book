//Criando o meu modelo Avaliacao

//Importando o mongoose
import mongoose from "mongoose";

const AvaliacaoSchema = new mongoose.Schema({
    idAvaliador:{
        type: mongoose.Schema.Types.ObjectId, //Possibilita que armazene o ID do Usuario
        ref:'Usuario',//Refencia de onde vem o ID
        required: true,
    },
    notaAvaliacao: { //Antes era qtdEstrelaAvaliacao
        type: Number, //Tipo Numerico
        required: true,
      },
      descricaoAvaliacao: {
        type: String,
      },
      receita: { //Lista os IDs de receita
        type: mongoose.Schema.Types.ObjectId, //Possibilita que o campo tenha o id de um outro model
        ref: 'Receita', //Model referenciado
        required: true,
      },
});

const Avaliacao = mongoose.model('Avaliacao', AvaliacaoSchema);
export default Avaliacao;