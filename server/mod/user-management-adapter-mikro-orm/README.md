# @ttt-adapter/user-management-mikro-orm

Adapter Library, contains a set of services, and directives that are related to Mikro ORM for User Management.

> **PostgreSQL** database supported only

## Installation

First install the module via package manager of your choice.

```bash
pnpm add @ttt-adapter/user-management-mikro-orm
```

In bootstrapping of your app:

```typescript
import {
  MikroOrmRepository
  UserRepository,
} from "@ttt-adapter/user-management-adapter-mikro-orm";

const ormRepo = new MikroOrmRepository()
await ormRepo.init({
  dbName: "postgres",
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  entities: [
    {
      tableName: "users",
      properties: {
        id: { type: "number", primary: true, autoincrement: true },
        email: { unique: true },
      },
    },
  ],
});
console.log(ormRepo.em); // access EntityManager via `em` property

// access a specific data source via its repository
const userRepo = new UserRepository();
userRepo.em = ormRepo.em.fork();
console.log(userRepo.findOne({ email: "test@gmail.com" }));
```

## Directory structure

- **repositories:** contains repositories working with the data source of entities
- **tests:** contains test suits

## Testing

```bash
# run dependencies via Docker
docker-compose up -d

# run tests
pnpm test
```
