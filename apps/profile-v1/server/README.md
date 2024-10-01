# TTTore Server

## Directory structure

- **domain**: contains modules defining business logic
- **mod**: contains modules as client adapter, protocol adapter, configuration helper

## Add new feature guidelines

(See attached diagram `Server - Add new feature flowchart` for more visualization)

- There are kinds of following modules that should be considered (see attached diagram `server-ERD` for more visualization)
- A dependency diagram should be designed to avoid risks of cycle import (see attached diagram `Server - User Management - Dependency Diagram` for more visualization)

### 1. Domain

Define business logic (entities, services, exceptions, DTOs). E.g:

- `@ttt-domain/user-management`
- `@ttt-domain/file-management`

Read more about module naming conventions at `server/domain/README.md`

### 2. Protocol Adapters (framework-based)

Define application protocol (controllers, models, mappers). E.g:

- `@ttt-adapter/nestjs-user-management-rest`
- `@ttt-adapter/nestjs-file-management-rest`

Read more about module naming conventions at `server/mod/README.md`

### 3. Client Adapters (optional)

Define methods working with 3rd parties. E.g:

- `@ttt-adapter/user-management-mikro-orm`
- `@ttt-adapter/file-management-aws-s3`

Read more about module naming conventions at `server/mod/README.md`

### 4. Configuration (framework-based)

Define configuration to integrate related modules from the application. E.g:

- `@ttt-module/nestjs-user-management`
- `@ttt-module/nestjs-mikro-orm-repository`
- `@ttt-module/nestjs-file-management`

Read more about module naming conventions at `server/mod/README.md`

## Naming convention

```typescript
// class name is in pascal case
class User {}

// suffix of class name reflects the inherited
class UserExistedException extends DomainException {}

// interface name starts with letter `I` and is in pascal case
interface IUserService {}

// prefix of service name starts with its resource name
class UserService {}

// prefix of controller name starts with its resource name
class UserController {}
```

## Unit of Work

Currently following to `Mikro ORM` (read more at https://mikro-orm.io/docs/5.9/unit-of-work)

## Issues

- Logging system (for debugging or tracing)
- Authentication (basic way (username/password), using OAuth2 client (e.g: Google, Facebook)) has NOT been handled
- Authorization (business logic of **Role/Permission**) has NOT been handled
- TTTore Unit of Work (currently ref: `Mikro ORM`, read more at https://mikro-orm.io/docs/5.9/unit-of-work)
- Entity schema generation is manually handled WITHOUT using any 3rd party library. E.g:

```typescript
import { Entity, Property, ThingEntity } from "@ttt-module/infra";

@Entity()
class UserEntity extends ThingEntity {
  @Property({ unique: true })
  email: string;
}

// generate entity JSON schema
const entity = new UserEntity();
console.log(entity.fromtttToMikroOrm()); // Mikro ORM entity JSON schema (ref: https://mikro-orm.io/docs/5.9/entity-schema)
```
