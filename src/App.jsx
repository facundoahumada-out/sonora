import { useState } from "react";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";

export default function App() {
  const [pagina, setPagina] = useState('landing')

  if (pagina === 'login') {
    return <Auth modoInicial="login" onVolver={() => setPagina('landing')} />
  }

  if (pagina === 'register') {
    return <Auth modoInicial="register" onVolver={() => setPagina('landing')} />
  }

  return <Landing onLogin={() => setPagina('login')} onRegister={() => setPagina('register')} />
}


