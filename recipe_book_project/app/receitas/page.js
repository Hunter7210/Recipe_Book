//Criando a pagina frontEnd para listar as receitas

import { useEffect, useState } from "react"; //UseEffect é Usado para fazer a requisição à API /api/receitas logo que a página carrega.

export default function ListaReceitas() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    async function fetchReceitas() {
      const res = await fetch("/api/receitas");
      const data = await res.json();
      setReceitas(data);
    }
    fetchReceitas();
  }, []);

  return (
    <div>
      <h1>Receitas</h1>
      {receitas.length === 0 ? (
        <p>Nenhuma receita cadastrada ainda.</p>
      ) : (
        receitas.map((receita) => (
          <div key={receita._id}>
            <h2>{receita.nomeReceita}</h2>
            <p>{receita.descricaoReceita}</p>
            <p>
              <strong>Categoria:</strong> {receita.categoriaReceita}
            </p>
            <p>
              <strong>Modo de Preparo:</strong> {receita.modoPreparo}
            </p>
            <h4>Ingredientes:</h4>
            <ul>
              {receita.ingredientes.map((ingred, index) => (
                <li key={index}>
                  {ingred.nomeIngred}: {ingred.qtdIngred}
                </li>
              ))}
            </ul>
            <p>
              <strong>Autor:</strong> {receita.userId.nome}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
