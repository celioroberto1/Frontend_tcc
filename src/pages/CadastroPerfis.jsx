import { useState, useEffect } from 'react'

function CadastroPerfis() {
  const [nomePerfil, setNomePerfil] = useState('')
  const [perfis, setPerfis] = useState([])

  // Carregar perfis do backend
  useEffect(() => {
    carregarPerfis()
  }, [])

  const carregarPerfis = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/perfis")

      if (!response.ok) {
        throw new Error("Erro ao buscar perfis")
      }

      const data = await response.json()
      setPerfis(data)

    } catch (error) {
      console.error("Erro ao carregar perfis:", error)
      alert("Erro ao carregar perfis do servidor!")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nomePerfil.trim()) return

    try {
      const response = await fetch("http://localhost:8080/api/perfis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: nomePerfil })
      })

      if (!response.ok) {
        throw new Error("Erro ao cadastrar perfil")
      }

      setNomePerfil('')
      carregarPerfis() // recarrega a tabela

      alert(`Perfil "${nomePerfil}" cadastrado com sucesso!`)

    } catch (error) {
      console.error("Erro ao cadastrar perfil:", error)
      alert("Erro ao cadastrar perfil no servidor!")
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Cadastro de Perfis</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="nome" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Nome do Perfil:
          </label>

          <input
            type="text"
            id="nome"
            value={nomePerfil}
            onChange={(e) => setNomePerfil(e.target.value)}
            required
            placeholder="Ex: Professor, Avaliador, Coordenador"
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cadastrar Perfil
        </button>
      </form>

      <h2>Perfis Cadastrados</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {perfis.map((perfil) => (
          <li
            key={perfil.id}
            style={{
              padding: '0.5rem',
              margin: '0.5rem 0',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              maxWidth: '400px'
            }}
          >
            {perfil.nome}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CadastroPerfis
