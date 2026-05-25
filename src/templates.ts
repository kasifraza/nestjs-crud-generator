export interface Field {
  name: string;
  type: string;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generateEntity(entity: string, fields: Field[]): string {
  const name = capitalize(entity);
  const props = fields.map(f => `  @Column()\n  ${f.name}: ${f.type};`).join('\n\n');
  return `import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ${name} {
  @PrimaryGeneratedColumn()
  id: number;

${props}
}
`;
}

export function generateCreateDto(entity: string, fields: Field[]): string {
  const name = capitalize(entity);
  const props = fields.map(f => `  ${f.name}: ${f.type};`).join('\n');
  return `export class Create${name}Dto {
${props}
}
`;
}

export function generateUpdateDto(entity: string, fields: Field[]): string {
  const name = capitalize(entity);
  const props = fields.map(f => `  ${f.name}?: ${f.type};`).join('\n');
  return `export class Update${name}Dto {
${props}
}
`;
}

export function generateService(entity: string, fields: Field[]): string {
  const name = capitalize(entity);
  const lower = entity.toLowerCase();
  return `import { Injectable, NotFoundException } from '@nestjs/common';
import { Create${name}Dto } from './${lower}.create-dto';
import { Update${name}Dto } from './${lower}.update-dto';

@Injectable()
export class ${name}Service {
  private items: any[] = [];
  private idCounter = 1;

  create(dto: Create${name}Dto) {
    const item = { id: this.idCounter++, ...dto };
    this.items.push(item);
    return item;
  }

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    const item = this.items.find(i => i.id === id);
    if (!item) throw new NotFoundException();
    return item;
  }

  update(id: number, dto: Update${name}Dto) {
    const item = this.findOne(id);
    Object.assign(item, dto);
    return item;
  }

  remove(id: number) {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) throw new NotFoundException();
    return this.items.splice(idx, 1)[0];
  }
}
`;
}

export function generateController(entity: string, fields: Field[]): string {
  const name = capitalize(entity);
  const lower = entity.toLowerCase();
  return `import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ${name}Service } from './${lower}.service';
import { Create${name}Dto } from './${lower}.create-dto';
import { Update${name}Dto } from './${lower}.update-dto';

@Controller('${lower}')
export class ${name}Controller {
  constructor(private readonly service: ${name}Service) {}

  @Post()
  create(@Body() dto: Create${name}Dto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Update${name}Dto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
`;
}
