import { defineConfig } from 'vitest/config'
import { config } from 'dotenv'

config()

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    exclude: ['dist/**', 'node_modules/**'],
  },
})
