<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Create a new nestjs project

```bash
nest new <name of the project>
```

## SetUp Prisma

```bash
pnpm install prisma --save-dev
```

## Init Prisma

```bash
pnpx prisma init
```

## Install dependences
```bash
pnpm install --save @nestjs/jwt passport-jwt
pnpm install --save-dev @types/passport-jwt
pnpm install bcrypt --save
pnpm install --save @nestjs/typeorm typeorm pg
pnpm i --save @nestjs/config
pnpm install uuid
pnpm install @types/uuid -D
pnpm install --save @nestjs/passport passport passport-local
pnpm install --save-dev @types/passport-local
pnpm install --save @nestjs/schedule typeorm
```

## Using the built-in ValidationPipe

```bash
$ pnpm i --save class-validator class-transformer
```

## Start server in production

```bash
pnpm start
```

## Start server in development (--watch)

```bash
pnpm run start:dev
```

## Build project (dist package)

```bash
pnpm run build
```

## Check with eslint

```bash
pnpm run lint
```

## Generate resource (REST API, GraphQL(code first), GraphQL(schema first), Microservice (non-HTTP), WebSockets)

```bash
nest g res <name>
```

## Generate pipe, service, controller and module with spec testing

```bash
nest g s <entity_name>
nest g co <entity_name>
nest g mo <entity_name>
nest g pi <entity_name/pipes/nameOfPipe>
nest g gu <entity_name/guards/nameOfGuards>
nest g mi <entity_name/nameOfMiddleware>
```
## Generate docs with swagger

```bash
pnpm install --save @nestjs/swagger
```

```bash
# //Add this into main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
```

```bash
const config = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
```
