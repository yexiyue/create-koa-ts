import fs from 'fs';
export const mkdir = (path) => {
    fs.mkdirSync(path, { recursive: true });
};
