# Light-it Test BE
Node version 18.15.0

## Instalación
- Si es necesario instalar y configurar MySQL
- Crear db de MySQL para proyecto
- Crear archivo .env basado en .env.default en carpeta raíz con los datos correspondiente
- Ejecutar el comando 'yarn install'
- Para crear las tablas en la DB ejecutar el comando 'yarn db-migrate'

## Ejecución
- Ejecutar el comando 'yarn start' 

## Testing
- Existe una colección de Postman con ejemplos de guia para todas las requests con el nombre "Light-it_Test.postman_collection.json"

<br/>

## Endpoints
Todos los endpoints excepto Registrar y Login, deben recibir un token de autenticación. Este token se obtiene de los endpoints Registrar y Login.
Dicho token contiene dentro información del usuario autenticado.

### Registrar 
POST: http://localhost:3000/api/register

Todos los campos son requeridos
```json
{
    "firstName": string,
    "lastName": string,
    "gender": string, //Options male or female
    "birthdate": Date,
    "username": string,
    "password": string,
    "repeatPassword": string //Equal to password
}
```
Retorna un token.

### Login 
POST: http://localhost:3000/api/login

Todos los campos son requeridos
```json
{
    "username": string,
    "password": string
}
```
Retorna un token.

### Obtener síntomas
GET: http://localhost:3000/api/symptom
Header: Authorization : Bearer {token}

Retorna una lista con todos los síntomas disponibles.

### Evaluar síntomas
POST: http://localhost:3000/api/symptom/evaluate
Header: Authorization : Bearer {token}

Recibe una lista de síntomas.
```json
{
    "symptoms": [
        { 
            "id": 10,
            "name": "Abdominal pain"
        },
        { 
            "id": 104,
            "name": "Back pain"
        }
    ]
}
```
Retorna una evaluación con varios diagnósticos.

### Obtener historial de diagnósticos
GET: http://localhost:3000/api/diagnosis/history
Header: Authorization : Bearer {token}

Retorna una lista con todos los diagnósticos realizados para el usuario, junto con sus síntomas, ordenados por fecha.

### Confirmar diagnósticos
PUT: http://localhost:3000/api/diagnosis/confirm/:uuid //uuid del diagnóstico a confirmar
Header: Authorization : Bearer {token}

Retorna "Diagnosis with uuid {uuid} has been confirmed.".

<br/>

## Estructura del proyecto
- routes:  
Contiene los archivos encargados de declarar las Uris de los endpoints existentes.

- controllers:  
Contiene los controllers encargados de validar los inputs para los distintos endpoints y conectar con la capa de servicio.

- services:  
Contiene los archivos encargados de manejar la lógica de negocio de cada uno de los endpoints existentes.

- database:
Contiene la definición de las tablas de la db utilizando sequelize.

- domain:  
Contiene la definición de las clases a utilizarse en typescript, así como también de los Dto necesarios.

- types:  
Contiene la definición de los tipos utilizados en todo el proyecto.

- exceptions:  
Contiene la definición de las excepciones utilizadas en el sistema.

- middleware:  
Contiene los middleware existentes como el encargado de autenticar a los usuarios que realizan las request.

- utils:  
Contiene funciones útiles para el resto del sistema como validadores de inputs, la conexión con la api externa o métodos para manejar los tokens.

<br/>

## Limitaciones
- Actualmente no es posible hacer Logout en el sistema.

<br/>

## Mejoras a futuro
- Tests
En una versión a futuro de este sistema deberían agregarse al menos pruebas unitarias para chequear la capa de lógica del sistema.
- Paginación
También debería aplicarse paginación al endpoint de Obtener síntomas o Obtener historial de diagnósticos, al igual que a futuros endpoints que manejen listas.
- Cache
Sin duda sería una gran mejora aplicar Cache tanto a endpoints de Get que puedan tener mucho tráfico como por ejemplo el Obtener síntomas, así como también para llamadas a apis externas como la existente. Esto evitaría realizar consultas innecesarias y duplicadas en muchos casos.
- 2FA
Dado que el sistema maneja datos sensibles como un historial médico, sería una buena idea utilizar Two-Factor Authentication, para evitar problemas de seguridad al autenticarse.