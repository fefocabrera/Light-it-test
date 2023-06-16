# Light-it Test BE
Node version 18.15.0

## Instalación
- Si es necesario instalar y configurar MySQL
- Crear db de MySQL para proyecto
- Crear archivo .env basado en .env.default en carpeta raiz con los datos correspondiente
- Ejecutar el comando 'yarn install'
- Para crear las tablas en la DB ejecutar el comando 'yarn db-migrate'

## Ejecución
- Ejecutar el comando 'yarn start' 

## Testing
- Existe una colección de Postman con ejemplos de guia para ambas requests

<br/>

# Endpoints

<br/>

# Estructura del proyecto
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
Contiene funciones útiles para el resto del sistema como validadores de inputs o la conexión con la api externa.

<br/>

# Limitaciones


<br/>

# Mejoras a futuro
