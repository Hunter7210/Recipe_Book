//Criando o Model User

import mongoose from "mongoose";
import bcrypt from "bcryptjs"; //Bcrypt responsavel por encriptar a senha quando vai para o banco

//Criando o Schema da minha Coleção User
const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

// Middleware que será executado antes de salvar um usuário
UserSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  const salt = await bcrypt.genSalt(10); // Gera um salt
  this.senha = await bcrypt.hash(this.senha, salt); // Encripta a senha
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
