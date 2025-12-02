import { Link, useNavigate } from 'react-router-dom'

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <nav style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Sistema React</h2>
        
        {/* Links de Navegação */}
        <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>
          Home
        </Link>
        
        <Link to="/cadastro-perfis" style={{ color: 'white', textDecoration: 'none' }}>
          Perfis
        </Link>
        
        <Link to="/cadastro-usuarios" style={{ color: 'white', textDecoration: 'none' }}>
          Usuários
        </Link>
        
        <Link to="/bancas" style={{ color: 'white', textDecoration: 'none' }}>
          Bancas
        </Link>
        
        {/* NOVO LINK PARA CURSOS */}
        <Link to="/cursos" style={{ color: 'white', textDecoration: 'none' }}>
          Cursos
        </Link>
        
        <Link to="/cadastro-outros" style={{ color: 'white', textDecoration: 'none' }}>
          Outros
        </Link>
      </div>
      
      <button 
        onClick={handleLogout}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </nav>
  )
}

export default Navbar