import { NextResponse } from "next/server";
import {
  getReceita,
  addReceita,
  updateReceita,
  deleteTodo,
} from "@/controllers/ReceitaController";

// Método GET - listar as tarefas do Usuário
export async function GET(req) {
  try {
    await getReceita(req);
    console.log("Passou pelo get da rota");
    return NextResponse.json({ message: "Receita obtida com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao obter receita" },
      { status: 500 }
    );
  }
}

// Método POST - nova tarefa
export async function POST(req) {
  try {
    await addReceita(req);
    return NextResponse.json({ message: "Receita adicionada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao adicionar receita" },
      { status: 500 }
    );
  }
}

// Método PUT - Atualiza uma tarefa existente
export async function PUT(req) {
  try {
    await updateReceita(req);
    return NextResponse.json({ message: "Receita atualizada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar receita" },
      { status: 500 }
    );
  }
}

// Método DELETE - Deleta uma tarefa existente
export async function DELETE(req) {
  try {
    await deleteTodo(req);
    return NextResponse.json({ message: "Receita deletada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar receita" },
      { status: 500 }
    );
  }
}
