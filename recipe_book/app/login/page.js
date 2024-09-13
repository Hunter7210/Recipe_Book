"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import CustomHead from "@/src/components/CustomHead";

export default function Login() {
  const [emailUsuario, setEmailUsuario] = useState("");
  const [senhaUsuario, setSenhaUsuario] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailUsuario, senhaUsuario }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        router.push("/receitas"); // Redireciona para a página de receitas após o login
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div>
      <CustomHead 
        title="Login - MyRecipeBook" 
        description="Faça login no MyRecipeBook para acessar suas receitas."
        keywords="login, MyRecipeBook, receitas"
      />
      <Navbar />
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email do Usuário"
            value={emailUsuario}
            onChange={(e) => setEmailUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senhaUsuario}
            onChange={(e) => setSenhaUsuario(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
