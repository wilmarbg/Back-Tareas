
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Tecnología usada

NestJs
Typescript
Postgresql
Docker Compose
Docker File 

## Archivo deploy.sh contiene todos los comandos necesarios para publicar el proyecto en un contenedor

## Por seguridad no se agregaron los archivos .env al git los cuales contienen las credenciales para conexión a Base de Datos
## Cuando se descargue el proyecto se debe de crear dos archivos env

.env
.prod.env

## Siguiendo la estructura del archivo .example.env

## Script de Base de datos si se quiere realizar pruebas local

## Tabla users

CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    username      varchar(115),
    email         varchar(115),
	password      varchar(255),
    codigo        char(5)
);

## Tabla tareas

CREATE TABLE tareas (
    id            SERIAL PRIMARY KEY,
    titulo        varchar(125),
    descripcion   varchar(255),
	completado    bool,
    fecha_creacion         TIMESTAMP,
    fecha_modificacion     TIMESTAMP,
	usuario_creacion       INTEGER,
    usuario_modificacion   INTEGER,
    estado        char(2) 
);

## Teniendo en cuenta que se uso Postgresql para Base de Datos