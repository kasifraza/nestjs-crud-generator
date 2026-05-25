#!/usr/bin/env node
import { generateCrud, Field } from './index';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: nestjs-crud <entity> <field:type ...> [--output <dir>]');
  process.exit(1);
}

const entity = args[0];
let outputDir: string | undefined;
const fieldArgs: string[] = [];

for (let i = 1; i < args.length; i++) {
  if (args[i] === '--output' || args[i] === '-o') {
    outputDir = args[++i];
  } else {
    fieldArgs.push(args[i]);
  }
}

const fields: Field[] = fieldArgs.map(f => {
  const [name, type] = f.split(':');
  return { name, type: type || 'string' };
});

const files = generateCrud({ entity, fields, outputDir });

if (!outputDir) {
  for (const [filename, content] of Object.entries(files)) {
    console.log(`// --- ${filename} ---`);
    console.log(content);
  }
}
