import * as fs from 'fs';
import * as path from 'path';
import { Field, generateController, generateService, generateCreateDto, generateUpdateDto, generateEntity } from './templates';

export { Field } from './templates';
export * from './templates';

export interface CrudOptions {
  entity: string;
  fields: Field[];
  outputDir?: string;
}

export function generateCrud(options: CrudOptions): Record<string, string> {
  const { entity, fields, outputDir } = options;
  const lower = entity.toLowerCase();

  const files: Record<string, string> = {
    [`${lower}.entity.ts`]: generateEntity(entity, fields),
    [`${lower}.create-dto.ts`]: generateCreateDto(entity, fields),
    [`${lower}.update-dto.ts`]: generateUpdateDto(entity, fields),
    [`${lower}.service.ts`]: generateService(entity, fields),
    [`${lower}.controller.ts`]: generateController(entity, fields),
  };

  if (outputDir) {
    fs.mkdirSync(outputDir, { recursive: true });
    for (const [filename, content] of Object.entries(files)) {
      fs.writeFileSync(path.join(outputDir, filename), content);
    }
  }

  return files;
}
