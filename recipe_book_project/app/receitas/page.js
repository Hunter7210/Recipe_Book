"use client";

import { useEffect, useState } from "react";

const ReceitasPage = () => {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReceita, setEditingReceita] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    nomeReceita: "",
    descricaoReceita: "",
    categoriaReceita: "",
    modoPreparo: "",
    ingredientes: [{ nomeIngred: "", qtdIngred: "" }],
  });

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const response = await fetch("/api/receitas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar receitas");
        }

        const data = await response.json();
        setReceitas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceitas();
  }, []);

  const handleEditClick = (receita) => {
    setEditingReceita(receita);
    setUpdatedData({
      nomeReceita: receita.nomeReceita,
      descricaoReceita: receita.descricaoReceita,
      categoriaReceita: receita.categoriaReceita,
      modoPreparo: receita.modoPreparo,
      ingredientes: receita.ingredientes,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...updatedData.ingredientes];
    updatedIngredients[index] = { ...updatedIngredients[index], [name]: value };
    setUpdatedData((prevData) => ({
      ...prevData,
      ingredientes: updatedIngredients,
    }));
  };

  const handleUpdate = async (receitaId) => {
    try {
      const response = await fetch(`/api/receitas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ receitaId, ...updatedData }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar receita");
      }

      const data = await response.json();
      console.log(data.message);

      setReceitas((prevReceitas) =>
        prevReceitas.map((receita) =>
          receita._id === receitaId ? { ...receita, ...updatedData } : receita
        )
      );
      setEditingReceita(null); // Feche o modo de edição
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  const handleDelete = async (receitaId) => {
    try {
      const response = await fetch(`/api/receitas`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ receitaId }),
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir receita");
      }

      const data = await response.json();
      console.log(data.message);

      setReceitas((prevReceitas) =>
        prevReceitas.filter((receita) => receita._id !== receitaId)
      );
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Minhas Receitas</h1>
      {receitas.length === 0 ? (
        <p>Você não tem receitas cadastradas.</p>
      ) : (
        <ul>
          {receitas.map((receita) => (
            <li key={receita._id}>
              {editingReceita && editingReceita._id === receita._id ? (
                <div>
                  <h2>Editar Receita</h2>
                  <input
                    type="text"
                    name="nomeReceita"
                    value={updatedData.nomeReceita}
                    onChange={handleInputChange}
                    placeholder="Nome da Receita"
                  />
                  <input
                    type="text"
                    name="descricaoReceita"
                    value={updatedData.descricaoReceita}
                    onChange={handleInputChange}
                    placeholder="Descrição"
                  />
                  <input
                    type="text"
                    name="categoriaReceita"
                    value={updatedData.categoriaReceita}
                    onChange={handleInputChange}
                    placeholder="Categoria"
                  />
                  <input
                    type="text"
                    name="modoPreparo"
                    value={updatedData.modoPreparo}
                    onChange={handleInputChange}
                    placeholder="Modo de Preparo"
                  />
                  <h3>Ingredientes</h3>
                  {updatedData.ingredientes.map((ingrediente, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        name="nomeIngred"
                        value={ingrediente.nomeIngred}
                        onChange={(e) => handleIngredientChange(index, e)}
                        placeholder="Nome do Ingrediente"
                      />
                      <input
                        type="number"
                        name="qtdIngred"
                        value={ingrediente.qtdIngred}
                        onChange={(e) => handleIngredientChange(index, e)}
                        placeholder="Quantidade"
                      />
                    </div>
                  ))}
                  <button onClick={() => handleUpdate(receita._id)}>
                    Atualizar
                  </button>
                  <button onClick={() => setEditingReceita(null)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div>
                  <h2>{receita.nomeReceita}</h2>
                  <p>{receita.descricaoReceita}</p>
                  <p>Categoria: {receita.categoriaReceita}</p>
                  <p>Modo de Preparo: {receita.modoPreparo}</p>
                  <ul>
                    {receita.ingredientes.map((ingrediente, index) => (
                      <li key={index}>
                        {ingrediente.nomeIngred} - {ingrediente.qtdIngred}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleEditClick(receita)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(receita._id)}>
                    Excluir
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReceitasPage;
