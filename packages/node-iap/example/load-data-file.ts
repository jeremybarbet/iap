import { existsSync } from 'fs';
import { join } from 'path';

export const loadDataFile = (): any => {
  const dataPath = join(__dirname, './data.json');

  if (existsSync(dataPath)) {
    return require(dataPath);
  }

  return require(join(__dirname, './data.example.json'));
};
