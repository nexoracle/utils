import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['lib/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    outDir: 'dist',
    clean: true,
    outExtension({ format }) {
        return {
            js: format === 'esm' ? '.mjs' : '.cjs',
        };
    },
});