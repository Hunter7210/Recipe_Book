"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReceitaPage() {
  const [receitas, setReceitas] = useState([]);
  const [newReceita, setNewReceita] = useState({
    nomeReceita: "",
    descricaoReceita: "",
    categoriaReceita: "",
    modoPreparo: "",
    ingredientes: [],
  });
  const [novoIngrediente, setNovoIngrediente] = useState({
    nomeIngrediente: "",
    quantIngrediente: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchReceitas = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redireciona para login se o usuário não estiver autenticado
        return;
      }
      console.log(token);
      try {
        const response = await fetch("/api/receita", {
          headers: {
            Method: GET,
            Authorization: `Bearer ${token}`, // Envia o token no header da requisição
          },
          
        }console.log("Fez"););

        if (response.ok) {
          const data = await response.json();
          setReceitas(data.receitas);
        } else {
          console.log("Erro ao buscar receitas, redirecionando para login");
          router.push("/login"); // Redireciona para login se houver erro
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        router.push("/login"); // Redireciona para login em caso de erro
      }
    };

    fetchReceitas();
  }, [router]);

  const addReceita = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/receita", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newReceita),
    });

    const data = await response.json();
    setReceitas([...receitas, data.receita]);
    setNewReceita({
      nomeReceita: "",
      descricaoReceita: "",
      categoriaReceita: "",
      modoPreparo: "",
      ingredientes: [],
    });
  };

  const addIngrediente = () => {
    setNewReceita({
      ...newReceita,
      ingredientes: [...newReceita.ingredientes, novoIngrediente],
    });
    setNovoIngrediente({ nomeIngrediente: "", quantIngrediente: "" });
  };

  const deleteReceita = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/receitas?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReceitas(receitas.filter((receita) => receita._id !== id));
  };

  return (
    <div>
      <h1>Receitas</h1>
      <h2>Adicionar Receita</h2>
      <input
        type="text"
        value={newReceita.nomeReceita}
        onChange={(e) =>
          setNewReceita({ ...newReceita, nomeReceita: e.target.value })
        }
        placeholder="Nome da Receita"
      />
      <input
        type="text"
        value={newReceita.descricaoReceita}
        onChange={(e) =>
          setNewReceita({ ...newReceita, descricaoReceita: e.target.value })
        }
        placeholder="Descrição"
      />
      <input
        type="text"
        value={newReceita.categoriaReceita}
        onChange={(e) =>
          setNewReceita({ ...newReceita, categoriaReceita: e.target.value })
        }
        placeholder="Categoria"
      />
      <input
        type="text"
        value={newReceita.modoPreparo}
        onChange={(e) =>
          setNewReceita({ ...newReceita, modoPreparo: e.target.value })
        }
        placeholder="Modo de Preparo"
      />
      <h3>Adicionar Ingrediente</h3>
      <input
        type="text"
        value={novoIngrediente.nomeIngrediente}
        onChange={(e) =>
          setNovoIngrediente({
            ...novoIngrediente,
            nomeIngrediente: e.target.value,
          })
        }
        placeholder="Nome do Ingrediente"
      />
      <input
        type="text"
        value={novoIngrediente.quantIngrediente}
        onChange={(e) =>
          setNovoIngrediente({
            ...novoIngrediente,
            quantIngrediente: e.target.value,
          })
        }
        placeholder="Quantidade"
      />
      <button onClick={addIngrediente}>Adicionar Ingrediente</button>
      <button onClick={addReceita}>Adicionar Receita</button>
      <ul>
        {receitas.map((receita) => (
          <li key={receita._id}>
            <h2>{receita.nomeReceita}</h2>
            <p>{receita.descricaoReceita}</p>
            <p>Categoria: {receita.categoriaReceita}</p>
            <p>Modo de Preparo: {receita.modoPreparo}</p>
            <h3>Ingredientes:</h3>
            <ul>
              {receita.ingredientes.map((ing, index) => (
                <li
                  key={index}
                >{`${ing.nomeIngrediente}: ${ing.quantIngrediente}`}</li>
              ))}
            </ul>
            <button onClick={() => deleteReceita(receita._id)}>
              Excluir Receita
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
