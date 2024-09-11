//Criando o modelo para a minha receita e para os ingredientes

import mongoose from "mongoose";

const ReceitaSchema = new mongoose.Schema({
    nameRecipe: {
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
    usuario: { //Necessário para armazenar o ID da minha coleção Usuario
        type: mongoose.Schema.Types.ObjectId, //Possibilita que este campo tera uma ID do Usuario
        ref: 'Usuario', //Refere-se ao modelo Usuario, permitindo a relação
        required: true,
    },
    //Como os ingredientes estão como subdocumentos então não ha necessidade de criar um modelo separado.
    ingredientes: [ //Lista ou Array que convem varios objetos
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
    ],
    avaliacao: [ //Lista de ids de avaliação
        {
            type: mongoose.Schema.Types.ObjectId, //Possibilita que este campo tera uma ID de Avaliação
            ref: 'Avaliacao',//Referencia o modelo Avaliação
        },
    ],

});

const Receita = mongoose.model('Receita', ReceitaSchema);
export default Receita;