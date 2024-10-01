# @ttt-domain/user-management

Domain Library, contains a set of services, and directives that are related to User Management.

## Installation

```bash
pnpm add @ttt-domain/user-management
```

## Directory structure

- **entities:** contains declaration of entities related to domain
- **interfaces:** contains interfaces of services related to domain
- **services:** contains services handling business logic related to domain
- **exceptions:** contains domain exceptions that can be throw from the services
- **dtos:** contains model of objects that are passed as arguments to services
- **tests:** contains test suits of services

## Testing

```bash
# run tests
pnpm test

# or run tests in watch mode
pnpm test:watch
```
