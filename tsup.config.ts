import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts', 'lib/browser/validation.ts'],
  format: ['cjs', 'esm', 'iife'], // Add 'iife' for browsers
  dts: true,
  outDir: 'dist',
  clean: true,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js', // Never use .cjs for browsers
    };
  },
});