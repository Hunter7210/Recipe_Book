//Criando a conexão com o mongoDB
import mongoose from "mongoose";

const dataBaseUrl = process.env.DATABASE_URL 

//verificação de falha no banco de dados
if (!dataBaseUrl) {
  throw new Error("Erro ao criar banco de dados");
}

const connectMongo = async () => {
  //Verificação se esta preenchido ou não
  if (mongoose.connection.readyState > 0) {
    //readyState pega o status da connection e se for 1 = Esta conectado; 0 = Não esta conectado
    return;
  } else {
    //Conectando ao MongoDB
    return await mongoose
      .connect(dataBaseUrl)
      .then("MongoDB Conectado")
      .catch((err) => console.error(err));
  }
};

export default connectMongo;