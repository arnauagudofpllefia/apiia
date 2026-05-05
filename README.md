# API REST minima amb Express - Bacalla

API REST del domini bacalla preparada per cobrir els tres nivells de l'enunciat:

- Basic: array en memoria + GET llistat + GET detall
- Superior: POST per afegir noves varietats
- Maxim: persistencia a MongoDB Atlas mantenint el mateix contracte REST

## Requisits

- Node.js 18+

## Instal-lacio

```bash
npm install
```

## Configuracio

Crea un fitxer `.env` basat en `.env.example`:

```env
PORT=3000
DATA_MODE=memory
CLIENT_ORIGINS=https://el-teu-frontend.vercel.app,http://localhost:3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/bacalla_db?retryWrites=true&w=majority
```

### Modes disponibles

- `DATA_MODE=memory`: usa array en memoria (nivell basic/superior)
- `DATA_MODE=mongo`: usa MongoDB Atlas (nivell maxim)

`MONGODB_URI` nomes es obligatoria quan `DATA_MODE=mongo`.

## Deploy a Render

Render no fa servir el teu fitxer `.env` local. Les variables s'han de definir a l'apartat Environment del servei.

Variables recomanades:

- `PORT`: no cal fixar-la manualment; Render la proporciona automaticament
- `DATA_MODE=memory` si vols arrencar sense MongoDB
- `DATA_MODE=mongo` si vols connectar amb Atlas
- `MONGODB_URI`: obligatoria nomes quan `DATA_MODE=mongo`
- `CLIENT_ORIGINS=https://frontiabacalla.vercel.app`

Si a Render el build acaba be pero el servei surt amb codi `1`, en aquest projecte el motiu mes habitual es un error de connexio amb MongoDB Atlas o una `MONGODB_URI` absent/incorrecta quan `DATA_MODE=mongo`.

## Execucio

```bash
npm start
```

Per desenvolupament:

```bash
npm run dev
```

## Seed (Atlas)

Per inserir 5 documents de bacalla a MongoDB Atlas:

```bash
npm run seed
```

## Endpoints

- `GET /api/bacalla` -> llistat complet
- `GET /api/bacalla/:id` -> detall per id
- `POST /api/bacalla` -> alta de nova varietat
- `GET /health` -> estat de l'API

### 404 de detall

Si l'id no existeix, retorna `404` amb JSON coherent.

### Exemple de POST /api/bacalla

```json
{
  "nom": "Bacalla de Lofoten",
  "origen": "Noruega",
  "tipus": "salat",
  "descripcio": "Tall gruixut curat en sal, ideal per receptes tradicionals."
}
```

Resposta esperada: `201 Created` amb l'objecte creat i `id` generat pel servidor.

## CORS

CORS permet els origens definits a `CLIENT_ORIGINS` (separats per comes) i tambe els origens locals de prova:

- `http://localhost:3000`
- `http://localhost:5173`

## Frontend Next.js (orientacio)

- Defineix la URL de l'API en una variable d'entorn del client:
  - `NEXT_PUBLIC_API_URL=https://la-teva-api-deploy.com`
- Fes fetch a:
  - `${NEXT_PUBLIC_API_URL}/api/bacalla`
  - `${NEXT_PUBLIC_API_URL}/api/bacalla/:id`
  - `${NEXT_PUBLIC_API_URL}/api/bacalla` (POST per al formulari del nivell superior)

## Exemple de consum

```js
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bacalla`)
  .then((res) => res.json())
  .then((data) => console.log(data));
```
