// src/pages/CadastroReceita.js
import React, { useState } from "react";
import axios from "axios";

const CadastroReceita = () => {
  const [nomeReceita, setNomeReceita] = useState("");
  const [descricaoReceita, setDescricaoReceita] = useState("");
  const [categoriaReceita, setCategoriaReceita] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");
  const [ingredientes, setIngredientes] = useState([
    { nomeIngrediente: "", quantIngrediente: "" },
  ]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/receitas", {
        nomeReceita,
        descricaoReceita,
        categoriaReceita,
        modoPreparo,
        ingredientes,
      });
      // Redirecione ou informe o usuário que a receita foi criada com sucesso
      console.log(response.data);
    } catch (err) {
      setError("Erro ao cadastrar receita. Tente novamente.");
    }
  };

  const handleIngredienteChange = (index, event) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index][event.target.name] = event.target.value;
    setIngredientes(newIngredientes);
  };

  const addIngrediente = () => {
    setIngredientes([
      ...ingredientes,
      { nomeIngrediente: "", quantIngrediente: "" },
    ]);
  };

  return (
    <div className="cadastro-receita-container">
      <h1>Cadastro de Receita</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomeReceita">Nome da Receita:</label>
          <input
            type="text"
            id="nomeReceita"
            value={nomeReceita}
            onChange={(e) => setNomeReceita(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descricaoReceita">Descrição:</label>
          <textarea
            id="descricaoReceita"
            value={descricaoReceita}
            onChange={(e) => setDescricaoReceita(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="categoriaReceita">Categoria:</label>
          <input
            type="text"
            id="categoriaReceita"
            value={categoriaReceita}
            onChange={(e) => setCategoriaReceita(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="modoPreparo">Modo de Preparo:</label>
          <textarea
            id="modoPreparo"
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
                name="nomeIngrediente"
                value={ingrediente.nomeIngrediente}
                onChange={(e) => handleIngredienteChange(index, e)}
                placeholder="Nome do Ingrediente"
                required
              />
              <input
                type="text"
                name="quantIngrediente"
                value={ingrediente.quantIngrediente}
                onChange={(e) => handleIngredienteChange(index, e)}
                placeholder="Quantidade"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addIngrediente}>
            Adicionar Ingrediente
          </button>
        </div>
        <button type="submit">Cadastrar Receita</button>
      </form>
    </div>
  );
};

export default CadastroReceita;
