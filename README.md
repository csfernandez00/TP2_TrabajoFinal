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

Luego de esto, debemos abrir el archivo **app.js** y buscaremos la linea de codigo en la que veamos **connection.sync**.
```

await connection.sync({ force: false }).then(() => {
      ...............
```


