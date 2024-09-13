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
      try {
        const response = await fetch("/api/receita", {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no header da requisição
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Dados recebidos:", data);
          if (Array.isArray(data.receitas)) {
            setReceitas(data.receitas);
          } else {
            console.error("Formato de dados inválido:", data);
            // Pode definir receitas como um array vazio em caso de erro
            setReceitas([]);
          }
        } else {
          console.error("Erro ao buscar receitas, redirecionando para login");
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

    try {
      const response = await fetch("/api/receita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Adicionando o token para autorização
        },
        body: JSON.stringify(newReceita), // Convertendo a nova receita para JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao adicionar receita:", errorData.error);
        return; // Se houver erro, interrompe a execução
      }

      const data = await response.json();
      console.log("Dados retornados da API:", data); // Verifique o objeto completo

      if (data && data.receita) {
        // Se a receita for criada com sucesso, atualiza o estado
        setReceitas((prevReceitas) => [...prevReceitas, data.receita]);
        console.log("Receita adicionada com sucesso");
      } else {
        console.error("Receita não encontrada nos dados retornados:", data);
      }

      // Reseta o formulário após o sucesso
      setNewReceita({
        nomeReceita: "",
        descricaoReceita: "",
        categoriaReceita: "",
        modoPreparo: "",
        ingredientes: [],
      });
    } catch (error) {
      console.error("Erro de rede ou servidor:", error);
    }
  };

  const addIngrediente = () => {
    if (!novoIngrediente.nomeIngrediente || !novoIngrediente.quantIngrediente) {
      console.error("Nome e quantidade do ingrediente são obrigatórios.");
      return;
    }

    // Adiciona o novo ingrediente à lista de ingredientes da receita
    setNewReceita((prevReceita) => ({
      ...prevReceita,
      ingredientes: [...prevReceita.ingredientes, novoIngrediente],
    }));

    // Reseta o formulário de novo ingrediente
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
        {Array.isArray(receitas) &&
          receitas.map((receita) => (
            <li key={receita._id}>
              <h2>{receita.nomeReceita}</h2>
              <p>{receita.descricaoReceita}</p>
              <p>Categoria: {receita.categoriaReceita}</p>
              <p>Modo de Preparo: {receita.modoPreparo}</p>
              <h3>Ingredientes:</h3>
              <ul>
                {Array.isArray(receita.ingredientes) &&
                  receita.ingredientes.map((ing, index) => (
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
