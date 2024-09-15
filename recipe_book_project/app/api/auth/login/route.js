import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, senha } = await req.json();

  await dbConnect();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuário não encontrado" }),
        {
          status: 400,
        }
      );
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Senha inválida" }), {
        status: 400,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(JSON.stringify({ token }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erro no servidor" }), {
      status: 500,
    });
  }
}
