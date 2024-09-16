// app/login-usuario/page.js

"use client"; // Adicione esta linha para usar hooks no cliente

import { useState } from "react";
import Navbar from "../components/Navbar";

const LoginUsuario = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Salve o token no localStorage
      alert("Login bem-sucedido");
      // Redirecione para a página principal ou onde desejar
    } else {
      alert("Erro ao fazer login");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <h1>Login de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginUsuario;
