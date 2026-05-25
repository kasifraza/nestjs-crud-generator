# @kasifraza/nestjs-crud-generator

[![npm version](https://img.shields.io/npm/v/@kasifraza/nestjs-crud-generator.svg)](https://www.npmjs.com/package/@kasifraza/nestjs-crud-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

CLI tool and library to generate full CRUD (controller, service, DTOs, entity) for NestJS projects.

## Installation

```bash
npm install -g @kasifraza/nestjs-crud-generator
```

## CLI Usage

```bash
# Print generated files to stdout
nestjs-crud Product name:string price:number

# Write files to a directory
nestjs-crud Product name:string price:number --output src/product
```

## Programmatic Usage

```typescript
import { generateCrud } from '@kasifraza/nestjs-crud-generator';

const files = generateCrud({
  entity: 'Product',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'price', type: 'number' },
  ],
  outputDir: './src/product', // optional
});
```

## Generated Files

- `<entity>.entity.ts` — TypeORM entity
- `<entity>.create-dto.ts` — Create DTO
- `<entity>.update-dto.ts` — Update DTO (partial)
- `<entity>.service.ts` — CRUD service
- `<entity>.controller.ts` — REST controller

## License

MIT
