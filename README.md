# Atelier Web

## Pasos para levantar el servicio en `Docker`

1. Cerciorarse de tener la versión de node `v18.12.1`. Esto tendria que ser automatico por el archivo `.nvmrc`

2. Instalar las dependencias usando el comando:

```
npm i
```

3. Crear un file `.env.development.local` duplicando `.env` y rellenando la información pertinente a sus variables de ambiente locales. Si tu API está corriendo también en `Docker`, las siguientes variables de ambiente deben ser de la siguiente forma:

```
BASE_API_URL=http://host.docker.internal:<puerto_donde_corre_la_api>
NEXT_PUBLIC_BASE_API_URL=http://localhost:<puerto_donde_corre_la_api>
```

4. Ejecutar el siguiente comando
```
docker compose -f docker-compose.dev.yml up -d --build
```

## Pasos para levantar el servicio de forma local
### Repetir los pasos anteriores del `1` al `3`

4. Ejecutar el siguiente comando
```
npm run dev
```
