import { useState } from "react";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Collection from "./pages/Collection"

export default function App() {
  const [pagina, setPagina] = useState('landing')
  const [usuario, setUsuario] = useState('')
  const [esNuevo, setEsNuevo] = useState(false)
  const [esAdmin, setEsAdmin] = useState(false)

  function entrar(nombre, nuevo) {
    setUsuario(nombre)
    setEsNuevo(nuevo)
    setPagina('welcome')
  }

  if (pagina === 'welcome') {
    return (
      <Welcome usuario={usuario} esNuevo={esNuevo} onContinuar={(generos) => setPagina('home')}></Welcome>
    )
  }

  if (pagina === 'login') {
    return (
      <Auth modoInicial="login" onVolver={() => setPagina('landing')} onEntrar={entrar}></Auth>
    )
  }

  if (pagina === 'register') {
    return (
      <Auth modoInicial="register" onVolver={() => setPagina('landing')} onEntrar={entrar}></Auth>
    )
  }

  if (pagina === 'home') {
    return (
      <Home usuario={usuario} esAdmin={esAdmin} onCargar={(p) => setPagina(p)}></Home>
    )
  }

  if (pagina === 'collection') {
    return (
      <Collection usuario={usuario} esAdmin={esAdmin} onCargar={(p) => setPagina(p)}></Collection>
    )
  }

  return <Landing onLogin={() => setPagina('login')} onRegister={() => setPagina('register')} />
}


