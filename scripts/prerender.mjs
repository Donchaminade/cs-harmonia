// Pré-rendu statique : injecte le HTML de l'application dans dist/index.html (SEO sans JavaScript).
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const file = resolve('dist/index.html');
const html = readFileSync(file, 'utf8').replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
writeFileSync(file, html);
rmSync('dist-ssr', { recursive: true, force: true });
console.log('prerender: dist/index.html');
