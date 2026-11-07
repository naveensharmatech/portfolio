import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

function standaloneElla() {
  let outDir;
  return {
    name: 'standalone-ella',
    configResolved(config) { outDir = resolve(config.root, config.build.outDir); },
    async writeBundle(_options, bundle) {
      const entry = Object.values(bundle).find(item => item.type === 'chunk' && item.isEntry && item.name === 'ellaWidget');
      if (!entry) throw new Error('Standalone Ella bundle missing');
      async function visit(dir) {
        for (const item of await readdir(dir, { withFileTypes: true })) {
          const path = resolve(dir, item.name);
          if (item.isDirectory()) await visit(path);
          else if (item.name.endsWith('.html') && path !== resolve(outDir, 'index.html')) {
            const html = await readFile(path, 'utf8');
            if (!html.includes('data-ella-widget')) {
              await writeFile(path, html.replace(/<\/body>/i, `<script type="module" data-ella-widget src="/${entry.fileName}"></script></body>`));
            }
          }
        }
      }
      await visit(outDir);
    },
  };
}

export default defineConfig({
  plugins: [react(), standaloneElla()],
  build: {
    rollupOptions: {
      input: { main: resolve(import.meta.dirname, 'index.html'), ellaWidget: resolve(import.meta.dirname, 'src/ella-widget.jsx') },
    },
  },
})
