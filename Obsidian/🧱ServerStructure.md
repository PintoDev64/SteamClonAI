## Tecnologías
[Express](https://expressjs.com/), [JSON Web Tokens - jwt.io](https://jwt.io/), [MySQL](https://www.mysql.com/), [MongoDB](https://www.mongodb.com/), [Socket.IO](https://socket.io/)
## Server Hostings
[Cloud Application Hosting | Render](https://render.com/) [Clever Cloud](https://www.clever-cloud.com/)
## Estructura
>[!NOTE] LISTA DE ENDPOINTS Y METODOS

- #🔷Core Conexión A SteamWebServer
	- **WEBSOCKET:** datos del usuario (Status, Notificaciones)
- #🔷Store Obtiene todos los datos de la tienda principal
	- **GET:** Juegos Totales (Paginación inicial)
	- **GET:** Juegos destacados
	- **GET:** Juegos en oferta
	- **GET:** Categorías
	- **GET:** Juegos mas Vendidos
	- **🤖 AI_GET:** Recomendaciones
- #🔷Game Obtiene todos los datos de un juego
	- **POST-PUT:** Añadir/Eliminar al carrito
	- **POST-PUT:** Añadir/Eliminar a deseados [🔷Wishlist ]
	- **GET:** Detalles
	- **GET:** Reviews
	- **🤖 AI_GET:** Resumen de reseñas
- #🔷Search Obtiene los juegos por medio de un sistema de búsqueda con filtros y paginación
	- **POST:** Añadir/Eliminar Filtros (palabras clave, categorías, tipos)
- #🔷Wishlist Obtiene los juegos añadidos a la lista de deseados del usuario
	- **POST-PUT:** Añadir/Eliminar de la lista
	- **POST-PUT:** Añadir/Eliminar al carrito [🔷Game ]
	- **POST:** Añadir/Eliminar Filtros [🔷Search ]
- #🔷Library Obtiene el contenido de los juegos
	- **GET:** Contenido del juego
	- **GET:** Detalles del juego [🔷Game ]
- #🔷Cart Obtiene los datos del carrito de compras de la plataforma
	- **GET:** Obtener los juegos en el carrito
	- **GET:** Juegos/Items relacionados
	- **POST:** Confirmar la compra
	- **DELETE:** Eliminar del carrito
- #🔷Profile Obtiene los datos del perfil del usuario
	- **GET:** Obtener datos del perfil (Nombre, Nivel, Status, N° Games, Amigos, Comentarios)
	- **GET:** Obtener actividad reciente (3 Juegos)
- #🔷Friends Obtiene y modifica datos de los amigos o cuentas relacionadas
	- GET: Obtener Lista de amigos (Nombre, Status)
	- **POST:** Enviar solicitudes de amistad
	- WEBSOCKET: Recibir/Enviar Mensajes
- #🔷Settings modifica las configuraciones de los usuarios (cliente/web)
	- **POST:** Enviar las configuraciones del usuario (correo, VAC status, Account name, Profile Name, Real Name, Theme, Imagen de perfil, Imagen de fondo)