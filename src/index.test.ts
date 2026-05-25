import { generateCrud } from './index';

describe('generateCrud', () => {
  const result = generateCrud({
    entity: 'Product',
    fields: [
      { name: 'name', type: 'string' },
      { name: 'price', type: 'number' },
    ],
  });

  it('generates all files', () => {
    expect(Object.keys(result)).toEqual([
      'product.entity.ts',
      'product.create-dto.ts',
      'product.update-dto.ts',
      'product.service.ts',
      'product.controller.ts',
    ]);
  });

  it('entity contains fields', () => {
    expect(result['product.entity.ts']).toContain('name: string');
    expect(result['product.entity.ts']).toContain('price: number');
    expect(result['product.entity.ts']).toContain('class Product');
  });

  it('create dto has fields', () => {
    expect(result['product.create-dto.ts']).toContain('name: string');
    expect(result['product.create-dto.ts']).toContain('class CreateProductDto');
  });

  it('update dto has optional fields', () => {
    expect(result['product.update-dto.ts']).toContain('name?: string');
  });

  it('service has CRUD methods', () => {
    expect(result['product.service.ts']).toContain('create(');
    expect(result['product.service.ts']).toContain('findAll()');
    expect(result['product.service.ts']).toContain('remove(');
  });

  it('controller has routes', () => {
    expect(result['product.controller.ts']).toContain("@Controller('product')");
    expect(result['product.controller.ts']).toContain('@Post()');
    expect(result['product.controller.ts']).toContain('@Delete');
  });
});
