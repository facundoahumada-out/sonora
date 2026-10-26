# Sonora
Plataforma web de reproducción musical, desarrollada como proyecto del curso **CIT2308 Desarrollo Web** de la Universidad Diego Portales.

- **Repositorio:** https://github.com/facundoahumada-out/sonora

- **Integrantes** Facundo Ahumada, Renato Saltzer, Máximo Bustamante.

## Funcionalidades
- **Búsqueda** por título, artista, álbum o género, y pestañas de tendencias, novedades y escuchadas recientemente.
- **Reproductor** fijo en la parte inferior con:
    - play/pausa
    - barra de progreso
    - volumen y silencio
    - canción siguiente y anterior
- **Cola de reproducción** con las canciones que siguen en la lista actual. Al terminar una canción, suena la siguiente.
- **Favoritos** sincronizados entre vistas.
- **Playlists:** se crean con un nombre validado, se agregan canciones desde el reproductor y se pueden ver y quitar canciones desde la Biblioteca.
- **Historial** de reproducción, se guarda en memoria durante la sesión.

## Realización
- **Front**: [React](https://react.dev/), [Vite](https://vite.dev/), [TailwindCSS](https://tailwindcss.com/) y [Lucide-react](https://lucide.dev/guide/packages/lucide-react)
- **Back**: Node.js, Express 5 y MongoDB
- **Seguridad**: contraseñas cifradas con bcrypt y sesión con JSON Web Tokens.

## Cómo ejecutarlo
Requisitos: Node.js 18 o superior, una base de datos MongoDB y un `client_id` de la [API de Jamendo](https://developer.jamendo.com/v3.0/tracks).

1. Crea `backend/.env`:
    ```env
    MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net
    JWT_SECRET=una_frase_secreta_larga
    JAMENDO_CLIENT_ID=tu_client_id
    PORT=3000
    ```
    `PORT` debe ser `3000`, porque el frontend llama a `http://localhost:3000`.

2. Inicio de backend, la primera vez carga el catálogo desde Jamendo:
    ```bash
    cd backend && npm install && node server.js
    ```

3. Iniciar frontend, en otra terminal desde la raíz del proyecto:
    ```bash
    npm install && npm run dev
    ```

## Decisiones
El desarrollo se basó principalmente en la documentación oficial de cada tecnología, y también en recursos públicos como proyectos y guías de referencia.

### Componentes
La interfaz se divide en vistas (`src/pages`) y componentes reutilizables (`src/components`). Lo que cambia de uso, se pasa por props o como `children`.
- [Passing props to a component - React](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [Thinking in React - React](https://react.dev/learn/thinking-in-react)

Los datos que se comparten en varias vistas, viven en `App.jsx` y bajan por props.
- [Conditional rendering - React](https://react.dev/learn/conditional-rendering)
- [Sharing state between components - React](https://react.dev/learn/sharing-state-between-components)

### Reproductor
Hay **un solo reproductor** para toda la app. Como siempre ocupa la misma posición en el árbol de componentes, React lo conserva al cambiar de vista y la música no se corta.
El audio se controla con una referencia al elemento `<audio>`, y sus eventos actualizan el progreso y pasan a la siguiente canción al terminar.
- [Preserving and resetting state - React](https://react.dev/learn/preserving-and-resetting-state#same-component-at-the-same-position-preserves-state)
- [HTMLMediaElement - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

### Datos y API
Las canciones se obtienen con `fetch`, y la interfaz muestra estados de carga, error y lista vacía. Se revisa `res.ok` porque `fetch` no considera error una respuesta como 500.
- [Using the Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Response.ok - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)

### Formulario y validación
Login y registro usan la validación nativa de HTML: campos obligatorios y contraseña de al menos 8 caracteres.
- [Constraint validation - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation)

### Accesibilidad
- Los campos tienen etiquetas visibles y los botones que solo muestran un ícono tienen `aria-label`.
- Las canciones se pueden recorrer con Tab y reproducir con Enter.
- El foco siempre es visible.
- [aria-label - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label)
- [Button pattern - W3C](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Problemáticas
El proyecto se inició prácticamente el primer día de clases. El grupo tiene experiencia previa, incluso laboral, pero siempre aparecen retos nuevos, y para resolverlos se recurrió principalmente a la documentación oficial.

### Conflictos al unir las ramas
Al unir las ramas, hubo varias veces en que se solapaban los cambios de cada integrante, por lo que estos conflictos se tuvieron que resolver manualmente.

### Ordenamiento y horario
Las listas se ordenan sobre una copia del arreglo, porque `sort` modifica el original. Los números y fechas se muestran en formato chileno.
Las fechas sin hora (`"2024-05-17"`) JavaScript las interpreta en UTC, por lo que en Chile aparecían con un día menos; se les agrega `T00:00:00` para que se lean en hora local.
- [Date.toLocaleDateString() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
- [Date time string format - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format)

### Música que se cortaba al cambiar de vista
Cada vista montaba su propio reproductor, por lo que React lo destruía al navegar y el audio se detenía. Se dejó un solo reproductor en `App.jsx`, que React conserva al cambiar de vista.
- [Preserving and resetting state - React](https://react.dev/learn/preserving-and-resetting-state#same-component-at-the-same-position-preserves-state)

### Errores del servidor
`fetch` solo considera error la falta de conexión, por lo que una respuesta 500 llegaba como si fuera correcta y rompía la lista de canciones. Se revisa `res.ok` antes de usar la respuesta.
- [Checking response status - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_response_status)

### Clic que se propagaba
Al marcar una canción como favorita, el clic subía hasta la fila y la canción empezaba a sonar. Se detiene la propagación en el botón del corazón.
- [Event bubbling - MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [Stopping propagation - React](https://react.dev/learn/responding-to-events#stopping-propagation)

### Barra espaciadora
Se quiso pausar la música con la barra espaciadora, pero esa tecla también escribe en los campos, activa botones y hace scroll. Se ignora cuando el foco está en un campo o un botón, y se evita el scroll de la página.
- [KeyboardEvent.code - MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
- [Subscribing to events - React](https://react.dev/learn/synchronizing-with-effects#subscribing-to-events)

### Datos desincronizados entre vistas
El corazón del reproductor seguía marcado al cambiar de canción, y una canción agregada a una playlist no aparecía en la Biblioteca hasta recargar. Los favoritos y las playlists pasaron a vivir en `App.jsx`, y se vuelven a cargar después de cada cambio.
- [Sharing state between components - React](https://react.dev/learn/sharing-state-between-components)

### Validación del nombre de playlist
El nombre se pedía con `prompt()`, que no permite mostrar errores y aceptaba nombres de solo espacios. Se reemplazó por un formulario que valida el nombre y muestra el error junto al campo.
- [Window.prompt() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
- [Reacting to input with state - React](https://react.dev/learn/reacting-to-input-with-state)

## Historial de trabajo
1. Se determinó primero un placeholder de login, el cual funcionó para ser base para aprendizaje de backend y conexión con servidores. [web-rmf](https://github.com/facundoahumada-out/web-rmf)
2. Implementación de todas las vistas del frontend, dejando pendientes algunos detalles gráficos.
3. Conexión con el backend: inicio de sesión y registro con contraseñas cifradas y JWT, guardado de los géneros elegidos y carga inicial del catálogo desde Jamendo.
4. Creación del reproductor fijo en la parte inferior, con versión para escritorio y celular, y conexión con las canciones de Home.
5. Se dejó un solo reproductor para toda la app, para que la música no se corte al cambiar de vista.
6. Correcciones para la entrega: ortografía, validación de formularios, estados de carga y error, enlaces rotos y página de términos y privacidad.
7. Mejoras visuales y de accesibilidad: portada en el reproductor, ícono de play sobre las canciones, estilos consistentes, etiquetas en los formularios, uso con teclado y pausa con la barra espaciadora.
8. Reorganización del código en componentes reutilizables (`Navbar`, `SongRow` y `Tabs`).
9. Implementación de favoritos y playlists en backend y frontend, evitando canciones duplicadas en el catálogo.
10. Reproductor completo: barra de progreso, volumen y silencio, canción siguiente y anterior, cola de reproducción e historial.
11. Playlists terminadas con formulario validado y opción de quitar canciones, uniendo el trabajo de ambas ramas.
12. Búsqueda funcional y eliminación de controles que no tenían función (aleatorio, repetir y edición de perfil).

## Referencias usadas a lo largo
- [Llamadas a Jamendo para importar canciones](https://developer.jamendo.com/v3.0/tracks)
- [Traer datos de una API externa y guardarlos en Mongo](https://baraksaidoff.medium.com/seed-mongodb-using-external-api-in-node-js-e73f7a85ea5)
- [updateOne con upsert: true para no duplicar canciones](https://www.mongodb.com/es/docs/drivers/node/current/crud/update/modify/)
- [Agregar una canción sin repetirla](https://www.mongodb.com/docs/manual/reference/operator/update/addtoset/)
- [Quitar una canción de la playlist](https://www.mongodb.com/docs/manual/reference/operator/update/pull/)
- [Proyecto que también guarda la playlist como un arreglo de IDs de canciones](https://github.com/nabeelmaklai/MAaaPlaylist)
- [Rutas GET/POST/PATCH/DELETE y req.params](https://expressjs.com/en/5x/guide/routing/)
- [Permitir que el front (Vite) llame al backend](https://expressjs.com/en/resources/middleware/cors/)
- [Guía para conectar el front y el back con fetch](https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/)
- [App de música con la misma estructura](https://github.com/AKS1719/React-Music-player)
