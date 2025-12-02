import { useState, useEffect } from "react";

function CadastroUsuarios() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/usuarios");

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      setUsuarios(data);

    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      alert("Erro ao carregar usuários do servidor!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      setNome("");
      setEmail("");
      setSenha("");

      carregarUsuarios(); // Atualiza a tabela

      alert("Usuário cadastrado com sucesso!");

    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário no servidor!");
    }
  };

  const excluirUsuario = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      carregarUsuarios();

    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gerenciar Usuários</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <h2>Cadastrar Usuário</h2>

        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "1rem",
            padding: "8px",
            width: "300px",
          }}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "1rem",
            padding: "8px",
            width: "300px",
          }}
        />

        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          placeholder="Digite a senha"
          style={{
            display: "block",
            marginBottom: "1rem",
            padding: "8px",
            width: "300px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#646cff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Salvar
        </button>
      </form>

      <h2>Usuários Cadastrados</h2>

      <table style={{ width: "80%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>ID</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Nome</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Email</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Ações</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  {u.id}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  {u.nome}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  {u.email}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  <button
                    onClick={() => excluirUsuario(u.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{ textAlign: "center", padding: "1rem" }}
              >
                Nenhum usuário cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CadastroUsuarios;
