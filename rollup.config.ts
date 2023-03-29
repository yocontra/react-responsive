import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import { externals } from 'rollup-plugin-node-externals'

export default defineConfig({
  input: './src/index.ts',
  treeshake: false,
  output: [
    {
      dir: 'dist/cjs',
      format: 'commonjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [externals(), typescript()]
})
