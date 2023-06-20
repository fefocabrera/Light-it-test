# light-it Test FE

## Instalación
-Ejecutar el comando 'yarn install'

## Ejecución
-Ejecutar el comando 'yarn serve'

## Compilar para producción
-Ejecutar el comando 'yarn build'

## Lints and fixes files
-Ejecutar el comando 'yarn lint'

<br/>

## Estructura del proyecto
- assets:
Recursos estáticos como imágenes, estilos CSS, etc.

- components:
Componentes reutilizables

- router:
Configuración y rutas

- types:
Definición de tipos

- views:
Vistas principales de la aplicación

<br/>

## Limitaciones
- La aplicación no es totalmente responsive y no se adapta a todos los tipos de dispositivos.
- El diseño de la aplicación es básico y no toma en cuenta del todo principios de buenas prácticas de usabilidad.

<br/>

## Mejoras a futuro
- En un futuro sería una buena idea aplicar autenticación con terceros como por ejemplo con Google o Facebook.
- Se podría aplicar una mayor cantidad de valores responsive utilizando tailwind.
- Se podría mejorar los mensajes de error que se muestran al usuario final, y no mostrar directamente los mensajes de error que llegan desde el BE.
- También se debería aplicar paginación al obtener la lista de síntomas o el historial de diagnósticos del usuario.
- Sin duda sería una gran mejora aplicar Cache como por ejemplo utilizando Redis, al obtener la lista de síntomas. Esto evitaría realizar consultas innecesarias y con mucho tráfico.