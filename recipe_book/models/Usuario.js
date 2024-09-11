//Criando o modelo para o meu Usuario

//Importando o mongoose
import mongoose from "mongoose";

//Criando a estrutura da minha coleção com Schema
const UsuarioSchema = new mongoose.Schema({
    nameUser: {
        type: String,
        required: true,
    },
    emailUser: {
        type: String,
        required: true,
        unique: true,
    },
    passwordUser: {
        type: String,
        required: true,
    },
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;
