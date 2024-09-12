import { jwtMiddleware } from "@/utils/middleware";
import {
  getReceita,
  addReceita,
  updateReceita,
  deleteTodo,
} from "@/controllers/ReceitaController";

// método GET - listar as tarefas do Usuário
export async function GET(req, res) {
  return jwtMiddleware(async (req, res) => {
    await getReceita(req, res);
  })(req, res);
}

// Método POST - nova tarefa
export async function POST(req, res) {
  return jwtMiddleware(async (req, res) => {
    await addReceita(req, res);
  })(req, res);
}

// Método PUT -  Atualiza uma tarefa existente
export async function PUT(req, res) {
  return jwtMiddleware(async (req, res) => {
    await updateReceita(req, res);
  })(req, res);
}

// Método DELETE -  Deleta uma tarefa existente
export async function DELETE(req, res) {
  return jwtMiddleware(async (req, res) => {
    await deleteTodo(req, res);
  })(req, res);
}
