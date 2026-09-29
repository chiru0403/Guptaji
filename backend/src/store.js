import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');

let chain = Promise.resolve();

export function readJson(fileName, fallback) {
  const file = join(dataDir, fileName);
  if (!existsSync(file)) return fallback;
  return JSON.parse(readFileSync(file, 'utf8'));
}

function writeJson(fileName, value) {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  writeFileSync(join(dataDir, fileName), `${JSON.stringify(value, null, 2)}\n`);
}

export function readList(fileName) {
  const value = readJson(fileName, []);
  return Array.isArray(value) ? value : [];
}

export function withList(fileName, mutator) {
  const run = chain.then(() => {
    const list = readList(fileName);
    const result = mutator(list);
    if (result.save) writeJson(fileName, result.list);
    return result.value;
  });
  chain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}
