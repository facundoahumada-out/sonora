import { useState } from "react";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Welcome from "./pages/Welcome";

export default function App() {
  const [pagina, setPagina] = useState('landing')
  const [usuario, setUsuario] = useState('')
  const [esNuevo, setEsNuevo] = useState(false)

  function entrar(nombre, nuevo) {
    setUsuario(nombre)
    setEsNuevo(nuevo)
    setPagina('welcome')
  }

  if (pagina === 'welcome') {
    return <Welcome usuario={usuario} esNuevo={esNuevo} onContinuar={(generos) => console.log('Géneros elegidos:', generos)} />
  }

  if (pagina === 'login') {
    return <Auth modoInicial="login" onVolver={() => setPagina('landing')} onEntrar={entrar} />
  }

  if (pagina === 'register') {
    return <Auth modoInicial="register" onVolver={() => setPagina('landing')} onEntrar={entrar} />
  }

  return <Landing onLogin={() => setPagina('login')} onRegister={() => setPagina('register')} />
}


