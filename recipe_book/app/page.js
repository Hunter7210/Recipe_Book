"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <h1>Bem-vindo ao Livro de Receitas</h1>
      <p>
        Explore nossas receitas ou faça login para adicionar suas próprias
        receitas.
      </p>
      <button onClick={() => router.push("/login")}>Login</button>
      <button onClick={() => router.push("/register")}>
        Cadastrar
      </button>
    </div>
  );
}
