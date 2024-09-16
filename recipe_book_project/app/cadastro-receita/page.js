// app/cadastro-receita/page.js

"use client"; // Adicione esta linha para usar hooks no cliente

import { useState } from "react";
import Navbar from "../components/Navbar";

const CadastroReceita = () => {
  const [nomeReceita, setNomeReceita] = useState("");
  const [descricaoReceita, setDescricaoReceita] = useState("");
  const [categoriaReceita, setCategoriaReceita] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");
  const [ingredientes, setIngredientes] = useState([
    { nomeIngred: "", qtdIngred: "" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    /*  console.log(token); */

    const data = {
      nomeReceita,
      descricaoReceita,
      categoriaReceita,
      modoPreparo,
      ingredientes,
    };

    const response = await fetch("/api/receitas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Supondo que o token esteja no localStorage
      },
      body: JSON.stringify(data),
    }); /* 
    console.log(data);
    console.log(response); */

    if (response.ok) {
      alert("Receita cadastrada com sucesso");
    } else {
      alert("Erro ao cadastrar receitaa");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="form">
        <h1>Cadastro de Receita</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nomeReceita}
              onChange={(e) => setNomeReceita(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              value={descricaoReceita}
              onChange={(e) => setDescricaoReceita(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Categoria:</label>
            <input
              type="text"
              value={categoriaReceita}
              onChange={(e) => setCategoriaReceita(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Modo de Preparo:</label>
            <textarea
              value={modoPreparo}
              onChange={(e) => setModoPreparo(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Ingredientes:</label>
            {ingredientes.map((ingrediente, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Nome do Ingrediente"
                  value={ingrediente.nomeIngred}
                  onChange={(e) => {
                    const newIngredientes = [...ingredientes];
                    newIngredientes[index].nomeIngred = e.target.value;
                    setIngredientes(newIngredientes);
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Quantidade"
                  value={ingrediente.qtdIngred}
                  onChange={(e) => {
                    const newIngredientes = [...ingredientes];
                    newIngredientes[index].qtdIngred = e.target.value;
                    setIngredientes(newIngredientes);
                  }}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setIngredientes([
                  ...ingredientes,
                  { nomeIngred: "", qtdIngred: "" },
                ])
              }
            >
              Adicionar Ingrediente
            </button>
          </div>
          <br/>
          <button type="submit">Cadastrar Receita</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroReceita;
