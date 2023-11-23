# TP2_TrabajoFinal
## Guia para la correcta utilizacion

### 1- Instalacion
En primer lugar una vez clonado el proyecto en nuestra pc, lo abriremos en un editor de codigo y ejecutaremos en consola el siguiente comando
```
npm install
```
### 2- Configuracion previa
Luego de haber completado el paso anterior, debemos comenzar con las preparaciones para lograr una limpia ejecucion sin errores.

Comenzaremos por crear un archivo llamado **".env"** y copiaremos en el todo el contenido del archivo **".envExample"**, una vez copiado, reemplazaremos sus valores, con los que vamos a utilizar para levantar el proyecto en nuestra computadora.

Luego de esto, debemos abrir el archivo **"app.js"** y buscaremos la linea de codigo en la que veamos **"connection.sync"**.
```
await connection.sync({ force: false }).then(() => {
      ...............
```
Una vez alli deberemos cambiar el "false" por la palabra "true", dado que es la primera vez que levantamos el proyecto y esto permite la correcta inicializacion de nuestras tablas en la base de datos. 

Nos quedara de la siguiente manera:
```
await connection.sync({ force: true }).then(() => {
                               ....
```

### 3- Levantar el proyecto
Con los pasos anteriores completos, ya estamos listos para levantar el proyecto, para esto abriremos la consola y ejecutaremos uno de los siguientes comandos:

En caso de querer levantar el proyecto para seguir desarrollandolo:
```
npm run dev
```

En caso de querer levantar el proyecto para produccion o demostracion:
```
npm run start
```





