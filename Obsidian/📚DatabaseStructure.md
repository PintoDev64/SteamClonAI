## Tecnologías
[Express](https://expressjs.com/), [JSON Web Tokens - jwt.io](https://jwt.io/), [MySQL](https://www.mysql.com/), [MongoDB](https://www.mongodb.com/), [Socket.IO](https://socket.io/)
## Server Hostings
[Render](https://render.com/) [Clever Cloud](https://www.clever-cloud.com/)
## Estructura
> [!TIP] Estructura de MongoDB
> **Uso:** Datos de los juegos, juegos adquiridos por los usuarios, Categorías de juegos, Ofertas, Reviews de Juegos, Amigos(Chats), Comentarios de Perfil
### Game Data
```json
{
	idGame: string,
	name: string,
	shortDescription: string,
	icon: string,
	images: [{
		type: "image" | "video",
		url: string
	}, ...rest]
	releaseDate: "DD-MM-YYYY",
	developer: {
		name: string,
		url: string
	},
	publishers: [{
		name: string,
		url: string | undefined
	}, ...rest],
	downloadUrl: string,
	categories: string[],
	features: string[<"Single-Player" | "Online PvP" | "Online Co-op" | "Cross-Platform Multiplayer" | "Steam Achievements" | "Captiosn Available" | "In-App Purchases" | "Steam Cloud" | "Steam Trading Cards" | "Valve Anti-Cheat">],
	requirements: {
		type: "3rd-Party Account",
		accountName: string
	} | undefined,
	lenguajes: {
		(<lenguaje_name>): {
			interface: boolean,
			subtitles: boolean,
			audio: boolean
		}
	},
	links: {
		url: string
	}
	platforms: ({
		(Win | Mac | Lin): {
		OS: string,
			processor: string,
			Memory: string,
			Graphics: string,
			DirectX: string,
			Storage: string,
			SoundCard?: string,
			AddiotionalNotes?: string,
		}
	})[],
	products: [{
		name: string,
		price: {
			default: number,
			format: string,
			discount: {
				value: number
				finalDate: "DD-MM-YYYY"
			}
		}
	},{
		name: string,
		content: ["Game", ...rest],
		price: {
			default: number,
			format: string,
			discount: {
				value: number
				finalDate: "DD-MM-YYYY"
			}
		}
	}, ...rest],
	downloadableContent: [{
		name: string,
		price: {
			default: number,
			format: string,
			discount: {
				value: number
				finalDate: "DD-MM-YYYY"
			}
		}
	},{
		name: string,
		price: {
			default: number,
			format: string,
			discount: {
				value: number
				finalDate: "DD-MM-YYYY"
			}
		}
	}, ...rest],
	about: string´md format´
}
```
### Game Reviews
```json
{
	idGame: string,
	data: [{
		type: "recommended" | "non-recomended",
		username: string,
		image: string<url,
		userUrl: string<url>,
		content: string,
		date: "DD-MM-YYYY",
		hours: number,
		reactions: {
			yes: number,
			no: number,
			funny: number
		}
	}]
}
```
### Profile Reviews
```json
{
	publicId: string,
	data: [{
		username: string,
		image: string<url,
		userUrl: string<url>,
		content: string,
		date: "DD-MM-YYYY"
	}]
}
```
### Friends Chat
```json
{
	relationId: string,
	data: [{
		username: string,
		image: string<url,
		userUrl: string<url>,
		content: string,
		date: "DD-MM-YYYY"
	}]
}
```
### Last Games Played
```json
{
	publicId: string,
	items: {
		name: string,
		datePlayed: "DD-MM-YYYY",
		totalHours: number,
		image: string
	}[3]
}
```

> [!NOTE] Estructura de MySQL
> **Uso:** Datos de los usuarios (correo, VAC status, Account name, Profile Name, Real Name, Theme, Profile Picture, Background Image), Carrito, Lista de deseados, Amigos (Status), Notificaciones
### Users
```sql
ACCOUNT_ID: UNIQUE
PUBLIC_ID: VARCHAR(128)
STATUS: "Online" | "Idle" | "Offline" | "Playing {game_name}"
PROFILE_NAME: VARCHAR(64),
REAL_NAME: VARCHAR(96)
ACCOUNT_NAME: VARCHAR(64)
VAC_STATUS: BOOLEAN
MAIL: VARCHAR(128)
THEME: NUMBER< 1 | 2 | 3 >
PROFILE_PICTURE: NUMBER< 1 | 2 | 3 >
BACKGROUND_IMAGE: NUMBER< 1 | 2 | 3 >
```
### Friends
```sql
RELATION_ID: UNIQUE
STATUS: BOOLEAN
FRIEND_ONE_ID: FOREING KEY - PUBLIC_ID (USERS)
FRIEND_TWO_ID: FOREING KEY - PUBLIC_ID (USERS)
```
### Cart
```sql
ACCOUNT_ID: FOREING KEY - ACCOUNT_ID (USERS)
ITEMS: JSON([type<Juegos>{ name, price, platform, images[0] }, ...rest])
```
### Wishlist
```sql
ACCOUNT_ID: FOREING KEY - PUBLIC_ID (USERS)
ITEMS: JSON([type<Juegos & { dateAdded }>{ name, price, platform, images[0], categories, releaseDate, dateAdded }, ...rest])
```
### Notifications
```sql
ACCOUNT_ID: FOREING KEY - PUBLIC_ID (USERS)
NOTIFICATIONS: JSON([{ publicId: string, message: string }])
```