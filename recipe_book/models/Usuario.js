// Importando o mongoose e bcrypt
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Importa bcrypt para criptografia de senhas

// Criando a estrutura da coleção com Schema
const UsuarioSchema = new mongoose.Schema({
  nomeUsuario: {
    type: String,
    required: true,
  },
  emailUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  senhaUsuario: {
    type: String,
    required: true,
  },
});

// Hash a senha antes de salvar
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senhaUsuario")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senhaUsuario = await bcrypt.hash(this.senhaUsuario, salt);
  next();
});

// Método para comparar senhas
UsuarioSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.senhaUsuario);
};

// Cria o modelo se ainda não existir
const Usuario =
  mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);

export default Usuario;
