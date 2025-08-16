import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  minify: true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  outDir: 'dist',
  target: 'es2020',
  tsconfig: 'tsconfig.lib.json',
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  }
})
