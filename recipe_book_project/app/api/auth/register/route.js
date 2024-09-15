import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  const { nome, email, senha } = await req.json();

  await dbConnect();

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Response(JSON.stringify({ message: "Usuário já existe" }), {
        status: 400,
      });
    }

    const newUser = new User({ nome, email, senha });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "Usuário registrado com sucesso" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erro no servidor" }), {
      status: 500,
    });
  }
}
