//Criando a autenticação para o Usuario no cadastro

import Usuario from "@/models/Usuario"; //Importa o model do Usuario
import connectMongo from "@/utils/dbConnect"; //Importa a conexão do MongoDB
import { NextResponse } from "next/server"; //Importa o NextResponse

export async function POST(request) {
  const data = await request.json(); //Transforma o requeste para o formato json
  await connectMongo(); //Abre conexão com o banco
  try {
    const usuario = await Usuario.create(data);
    return NextResponse.json({ success: true, data: usuario });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
