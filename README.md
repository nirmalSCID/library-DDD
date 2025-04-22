# DDD Library Management Project

---

## 📦 Root Files

- `package.json`  
  Defines project metadata, dependencies, and scripts.

- `package-lock.json`  
  Locks dependency versions to ensure consistent installs.

- `tsconfig.json`  
  Configures TypeScript compiler options.

---

## 📁 `api/` – Presentation Layer

Handles incoming HTTP requests and outgoing responses.

- `server.ts`  
  Initializes the Fastify server, sets up routes and middleware, and configures the `tsyringe` container for Dependency Injection.

### `controllers/`

- `library.controller.ts`  
  Exposes endpoints and delegates logic to use cases.

### `dtos/` – Data Transfer Objects

Define the structure of data expected in HTTP requests.

- `add-book.dto.ts`  
- `borrow-book.dto.ts`  
- `return-book.dto.ts`  

Each DTO validates and formats external data before it's passed into the core logic.

---

## 📁 `src/` – Core Application Logic

Organized into layers following DDD principles.

---

### 📂 `application/` – Use Case Layer

Coordinates domain logic through service orchestration and abstracted interfaces.

#### `ports/`

- `book.repository.port.ts`  
- `loan.repository.port.ts`  
- `member.repository.port.ts`  

These are **interfaces** defining contracts for repository behavior (e.g., fetch, save).

#### `services/`

- `loan.service.ts`  
  Encapsulates business logic involving multiple entities (e.g., validating loan conditions).

#### `usecases/`

- `add-book.usecase.ts`  
- `borrow-book.usecase.ts`  
- `return-book.usecase.ts`  

Each use case implements a specific user story or business operation.

---

### 📂 `domain/` – Core Business Entities

Contains the  domain model.

- `book.ts`  
- `loan.ts`  
- `member.ts`  

Each file defines a domain entity with state and behavior.

- `errors.ts`  
  Defines domain-specific exceptions and validation rules.

---

### 📂 `infrastructure/` – Technical Implementations

Implements interfaces for external systems like databases, caches, and loggers.

- `cache.interface.ts`, `database.interface.ts`, `logger.interface.ts`  
  Abstract contracts for technical dependencies.

- `in-memory-cache.ts`, `in-memory-database.ts`, `in-memory-logger.ts`  
  Simple in-memory mocks for quick prototyping and testing.

#### `repositories/`

- `book.repository.ts`  
- `loan.repository.ts`  
- `member.repository.ts`  

Implements the actual data access logic, fulfilling the repository ports.

---

## ✅ Summary

- **Clean architecture** with strict separation of concerns.
- **Domain-Driven Design (DDD)** applied for high cohesion and low coupling.



## Extras 
A hypotheical webauthn project structure
```
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   ├── Session.ts
│   │   │   └── AuthenticatorDevice.ts
│   │   ├── value-objects/
│   │   │   └── Email.ts
│   │   ├── repositories/
│   │   │   ├── IUserRepository.ts
│   │   │   └── ISessionRepository.ts
│   │   ├── services/
│   │   └── index.ts            // Domain Barrel File
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── InitiateRegistrationUseCase.ts
│   │   │   ├── CompleteRegistrationUseCase.ts
│   │   │   ├── InitiateAuthenticationUseCase.ts
│   │   │   ├── CompleteAuthenticationUseCase.ts
│   │   │   ├── ValidateSessionUseCase.ts
│   │   │   └── index.ts        // Use Cases Barrel File
│   │   ├── dtos/
│   │   │   ├── UserDTO.ts
│   │   │   └── WebAuthnDTOs.ts
│   │   └── services/
│   │   └── index.ts            // Application Barrel File
│   ├── infrastructure/
│   │   ├── persistence/
│   │   │   ├── InMemoryUserRepository.ts
│   │   │   └── InMemorySessionRepository.ts
│   │   ├── webauthn/
│   │   │   ├── IChallengeStore.ts
│   │   │   └── InMemoryChallengeStore.ts
│   │   ├── web/
│   │   │   └── fastify/
│   │   └── index.ts            // Infrastructure Barrel File
│   ├── presentation/
│   │   ├── controllers/
│   │   │   └── AuthController.ts
│   │   ├── hooks/
│   │   │   └── authHook.ts
│   │   ├── routes/
│   │   │   └── authRoutes.ts
│   │   └── Server.ts
│   ├── shared/                 // Shared utilities, constants, types
│   │   ├── di-tokens.ts        // Dependency Injection Tokens
│   │   └── utils.ts            // Utility functions (e.g., base64)
│   └── main.ts                 // App entry point & DI Container Setup
├── package.json                // Modified: Added tsyringe, reflect-metadata
├── tsconfig.json               // Modified: Decorator metadata enabled
└── .env                        // Environment variables
```