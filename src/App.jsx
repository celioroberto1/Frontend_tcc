import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

// Importações das telas
import Login from './componentes/Login'
import Navbar from './componentes/Navbar'
import Home from './pages/Home'
import CadastroPerfis from './pages/CadastroPerfis'
import CadastroUsuarios from './pages/CadastroUsuarios'
import GerenciarBancas from './pages/GerenciarBancas' // <-- ADICIONADO AQUI

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <Routes>

        {/* --- LOGIN (rota pública) --- */}
        <Route 
          path="/" 
          element={
            !isAuthenticated 
              ? <Login setIsAuthenticated={setIsAuthenticated} /> 
              : <Navigate to="/home" />
          }
        />

        {/* --- HOME --- */}
        <Route 
          path="/home" 
          element={
            isAuthenticated 
              ? (
                  <>
                    <Navbar setIsAuthenticated={setIsAuthenticated} />
                    <Home />
                  </>
                )
              : <Navigate to="/" />
          }
        />

        {/* --- CADASTRO DE PERFIS --- */}
        <Route 
          path="/cadastro-perfis" 
          element={
            isAuthenticated 
              ? (
                  <>
                    <Navbar setIsAuthenticated={setIsAuthenticated} />
                    <CadastroPerfis />
                  </>
                )
              : <Navigate to="/" />
          }
        />

        {/* --- CADASTRO DE USUÁRIOS --- */}
        <Route 
          path="/cadastro-usuarios" 
          element={
            isAuthenticated 
              ? (
                  <>
                    <Navbar setIsAuthenticated={setIsAuthenticated} />
                    <CadastroUsuarios />
                  </>
                )
              : <Navigate to="/" />
          }
        />

        {/* --- GERENCIAR BANCAS (NOVO) --- */}
        <Route 
          path="/bancas" 
          element={
            isAuthenticated 
              ? (
                  <>
                    <Navbar setIsAuthenticated={setIsAuthenticated} />
                    <GerenciarBancas />
                  </>
                )
              : <Navigate to="/" />
          }
        />

      </Routes>
    </Router>
  )
}

export default App
