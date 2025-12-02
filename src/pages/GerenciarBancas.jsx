import { useState, useEffect } from "react";

function GerenciarBancas() {
  const apiUrl = "http://localhost:8080/api/bancas";

  const [bancas, setBancas] = useState([]);
  const [id, setId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cursoId, setCursoId] = useState("");

  // Carregar bancas ao iniciar
  useEffect(() => {
    carregarBancas();
  }, []);

  const carregarBancas = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Erro ao buscar bancas");
      const data = await response.json();
      setBancas(data);
    } catch (error) {
      alert(error.message);
    }
  };

  // Criar ou atualizar banca
  const handleSubmit = async (e) => {
    e.preventDefault();

    const banca = {
      descricao,
      cursoId: Number(cursoId),
    };

    try {
      let response;

      if (id) {
        // Atualizar
        response = await fetch(`${apiUrl}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(banca),
        });
      } else {
        // Criar
        response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(banca),
        });
      }

      if (!response.ok) throw new Error("Erro ao salvar banca");

      limparFormulario();
      carregarBancas();
    } catch (error) {
      alert(error.message);
    }
  };

  const editarBanca = (banca) => {
    setId(banca.id);
    setDescricao(banca.descricao);
    setCursoId(banca.cursoId || "");
  };

  const deletarBanca = async (id) => {
    if (!confirm("Deseja realmente excluir esta banca?")) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao deletar banca");
      carregarBancas();
    } catch (error) {
      alert(error.message);
    }
  };

  const limparFormulario = () => {
    setId("");
    setDescricao("");
    setCursoId("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gerenciar Bancas</h1>

      <h2>{id ? "Editar Banca" : "Nova Banca"}</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input type="hidden" value={id} />

        <label>Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px" }}
        />

        <label>Curso ID:</label>
        <input
          type="number"
          value={cursoId}
          onChange={(e) => setCursoId(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px" }}
        />

        <button type="submit">
          {id ? "Atualizar" : "Salvar"}
        </button>
      </form>

      <h2>Lista de Bancas</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Curso ID</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {bancas.map((banca) => (
            <tr key={banca.id}>
              <td>{banca.id}</td>
              <td>{banca.descricao}</td>
              <td>{banca.cursoId}</td>
              <td>
                <button onClick={() => editarBanca(banca)}>Editar</button>
                <button onClick={() => deletarBanca(banca.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GerenciarBancas;
