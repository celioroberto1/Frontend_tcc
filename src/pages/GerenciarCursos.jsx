import { useState, useEffect } from "react";

function GerenciarCursos() {
  const apiUrl = "http://localhost:8080/api/cursos";

  const [cursos, setCursos] = useState([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");

  // Carregar cursos ao iniciar
  useEffect(() => {
    carregarCursos();
  }, []);

  const carregarCursos = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Erro ao buscar cursos");
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      alert(error.message);
    }
  };

  // Criar ou atualizar curso
  const handleSubmit = async (e) => {
    e.preventDefault();

    const curso = {
      nome,
    };

    try {
      let response;

      if (id) {
        // Atualizar
        response = await fetch(`${apiUrl}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(curso),
        });
      } else {
        // Criar
        response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(curso),
        });
      }

      if (!response.ok) throw new Error("Erro ao salvar curso");

      limparFormulario();
      carregarCursos();
    } catch (error) {
      alert(error.message);
    }
  };

  const editarCurso = (curso) => {
    setId(curso.id);
    setNome(curso.nome);
  };

  const deletarCurso = async (id) => {
    if (!confirm("Deseja realmente excluir este curso?")) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao deletar curso");
      carregarCursos();
    } catch (error) {
      alert(error.message);
    }
  };

  const limparFormulario = () => {
    setId("");
    setNome("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gerenciar Cursos</h1>

      <h2>{id ? "Editar Curso" : "Novo Curso"}</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input type="hidden" value={id} />

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nome" style={{ display: "block", marginBottom: "5px" }}>
            Nome do Curso:
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          {id ? "Atualizar" : "Salvar Curso"}
        </button>

        {id && (
          <button
            type="button"
            onClick={limparFormulario}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h2>Cursos Cadastrados</h2>

      {cursos.length === 0 ? (
        <p>Nenhum curso cadastrado.</p>
      ) : (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem"
        }}>
          <thead>
            <tr style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6"
            }}>
              <th style={{
                padding: "12px",
                textAlign: "left",
                border: "1px solid #dee2e6"
              }}>ID</th>
              <th style={{
                padding: "12px",
                textAlign: "left",
                border: "1px solid #dee2e6"
              }}>Nome</th>
              <th style={{
                padding: "12px",
                textAlign: "left",
                border: "1px solid #dee2e6"
              }}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id} style={{
                borderBottom: "1px solid #dee2e6",
                "&:hover": {
                  backgroundColor: "#f8f9fa"
                }
              }}>
                <td style={{
                  padding: "12px",
                  border: "1px solid #dee2e6"
                }}>{curso.id}</td>
                <td style={{
                  padding: "12px",
                  border: "1px solid #dee2e6"
                }}>{curso.nome}</td>
                <td style={{
                  padding: "12px",
                  border: "1px solid #dee2e6"
                }}>
                  <button
                    onClick={() => editarCurso(curso)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ffc107",
                      color: "#212529",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "5px",
                      marginBottom: "5px"
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletarCurso(curso.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginBottom: "5px"
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GerenciarCursos;