# Sonora

Plataforma web de reproducción musical, desarrollada como proyecto del curso **CIT2308 Desarrollo Web** de la universidad Diego Portales.

## Funcionalidades

- **Búsqueda** por título, artista, álbum o género, y pestañas de tendencias, novedades y escuchadas recientemente.
- **Reprroductor** Fijo en la parte inferior con:
    - play/pausa
    - barra de progreso
    - volumen y silencio
    - canción siguiente y anterior
- **Cola de reproducción** con las canciones que siguen en la lista actual. Al terminar una canción, suena la siguiente.
- **Favoritos** sincronizados entre pestañas.
- **Playlists** con todas sus funcionalidades.
- **Historial** de reproducción, se guarda en memoría durante la sesión.

## Realización

- **Front**: [React](https://react.dev/), [Vite](https://vite.dev/), [TailwindCSS](https://tailwindcss.com/) y [Lucide-react](https://lucide.dev/guide/packages/lucide-react)
- **Back**: Node.js, Express 5 y MongoDB
- **Seguridad**:  contraseñas cifradas con bcrypt y sesión con JSON Web Tokens.

## Requisitos

1.  Crea `backend/.env`:
    ```env
    MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net
    JWT_SECRET=una_frase_secreta_larga
    JAMENDO_CLIENT_ID=tu_client_id
    PORT=300
    ```
    `PORT` debe ser `3000`, porque el frontend llama a `http://localhost:3000`.
   
2. Inicio de backend, la primera vez carga el catálogo desde Jamendo:
    ```bash
    npm install && node server.js
    ```

3. Iniciar frontend:
## Historial de desarrollo

Esta sección reusme lo que se hizo en cada etapa.

### Etapa 1 - Maqueta visual

