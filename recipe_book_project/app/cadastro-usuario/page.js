// app/cadastro-usuario/page.js

"use client"; // Para utilizar hooks no cliente

import { useState } from "react";
import Navbar from "../components/Navbar";

const CadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (response.ok) {/* 
        Router.push("/login-usuario") */
      alert("Usuário cadastrado com sucesso");
    } else {
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="form">
        <h1>Cadastro de Usuário</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
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
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;
