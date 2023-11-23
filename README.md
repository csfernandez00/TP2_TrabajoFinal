# TP2_TrabajoFinal
## Guia para la instalacion
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
> [!WARNING]
> Una vez levantado el proyecto por primera vez, volver a colocar el valor en "false", de lo contrario inicializaremos las tablas cada vez que levantamos el proyecto.

### 3- Levantar el proyecto
Con los pasos anteriores completos, ya estamos listos para levantar el proyecto, para esto abriremos la consola y ejecutaremos uno de los siguientes comandos:

A- En caso de querer levantar el proyecto para seguir desarrollandolo:
```
npm run dev
```

B- En caso de querer levantar el proyecto para produccion o demostracion:
```
npm run start
```

# Guia de endpoints: Users

## createUser
Registrar un nuevo usuario en la base de datos

**Request:**
```
POST /users
```

**Body:**
```
{
  "nombre": "Your Name",
  "apellido": "Your Last Name",
  "mail": "your@email.com",
  "empresa": "Your Company",
  "pais": "Your Country",
  "password": "yourPassword",
  "id_rol": 1 // Replace with the desired role ID
}
```

**Response:**
```
{
  "success": true,
  "message": "El usuario ha sido creado exitosamente!",
  "data": {
    "id_usuario": 1, // User ID
    "nombre": "Your Name",
    "apellido": "Your Last Name",
    "mail": "your@email.com",
    "empresa": "Your Company",
    "pais": "Your Country",
    "id_rol": 1 // Role ID
  }
}
```

## login
Endpoint para inciar sesion 

**Request:**
```
POST /users/login
```

**Body:**
```
{
  "mail": "your@email.com",
  "password": "yourPassword"
}
```

**Response:**
```
Envia el token como una cookie y devuelve el siguiente objeto
{
  "success": true,
  "message": "Login completo exitosamente!",
}
```

## updateUser
Actualiza un usuario existente, accesible por admin para editar cualquier usuario, o accesible por usuario para editar sus propios datos unicamente.

**Request:**
```
PUT /users/:id
```
**Body:**
Le pasamos cualquiera de los siguientes datos, solo los que vamos a modificar:
```
{
  "nombre": "Updated Name",
  "apellido": "Updated Last Name",
  "mail": "updated@email.com",
  "password": "updatedPassword"
}
```

**Response:**
```
{
  "success": true,
  "message": "Usuario modificado exitosamente!",
  "data": {
    "id_usuario": 1, // User ID
    "nombre": "Updated Name",
    "apellido": "Updated Last Name",
    "mail": "updated@email.com",
    "empresa": "Your Company", // Company remains unchanged
    "pais": "Your Country", // Country remains unchanged
    "id_rol": 1 // Role ID remains unchanged
  }
}
```

## getUserByID
Obitiene los datos de un usuario por su ID, accesible para admin y para usuario coincidente con el ID ingresado.

**Request:**
```
GET /users/:id
```
**Response:**

```
{
  "success": true,
  "data": {
    "id_usuario": 1, // User ID
    "nombre": "Your Name",
    "apellido": "Your Last Name",
    "mail": "your@email.com",
    "empresa": "Your Company",
    "pais": "Your Country",
    "role": "YourRoleName" // User's role name
  }
}
```
## getAllUsers
Devuelve lista de todos los usuario de la base de datos, solo accesible para rol "ADMIN".

**Request:**
```
GET /users
```
**Response:**
```
{
  "success": true,
  "data": [
    {
      "id_usuario": 1, // User ID
      "nombre": "User 1 Name",
      "apellido": "User 1 Last Name",
      "mail": "user1@email.com",
      "empresa": "User 1 Company",
      "pais": "User 1 Country",
      "role": "User 1 RoleName" // User's role name
    },
    {
      "id_usuario": 2, // User ID
      "nombre": "User 2 Name",
      "apellido": "User 2 Last Name",
      "mail": "user2@email.com",
      "empresa": "User 2 Company",
      "pais": "User 2 Country",
      "role": "User 2 RoleName" // User's role name
    }
  ]
}
```

## deleteUser
Elimina un usuario por su ID.

**Request:**
```
DELETE /users/:id
```

**Response:**
```
{
  "success": true,
  "message": "Usuario eliminado exitosamente!"
}
```


# Guia de endpoints: Roles
## createRole

Crear nuevo role.

**Request:**
```
POST /roles
```
**Body:**
```
{
  "nombre": "RoleName"
}
```
**Response:**
```
{
  "success": true,
  "message": "Se ha creado el rol exitosamente!"
}
```

## getAllRoles

Obtener todos los roles registrados.

**Request:**
```
GET /roles
```
**Response:**
```
{
  "success": true,
  "data": [
    {
      "id_rol": 1, // Role ID
      "nombre": "Role 1 Name"
    },
    {
      "id_rol": 2, // Role ID
      "nombre": "Role 2 Name"
    }
  ]
}
```
## getRoleByID

Obtener role por su ID.

**Request:**
```
GET /roles/:id
```

**Response:**
```
{
  "success": true,
  "data": {
    "id_rol": 1, // Role ID
    "nombre": "Your Role Name"
  }
}
```
## updateRole

Actualizar role existente.

Request:
```
PUT /roles/:id
```

**Body:**
```
{
  "nombre": "Updated Role Name"
}
```
**Response:**
```
{
  "success": true,
  "message": "Rol modificado exitosamente!"
}
```
## deleteRole

Eliminar role a traves de su ID.

**Request:**
```
DELETE /roles/:id
```
**Response:**

```
{
  "success": true,
  "message": "Rol eliminado exitosamente!"
}
```






