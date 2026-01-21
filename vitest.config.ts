import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    // Don't fail if no test files are found
    passWithNoTests: true,
  },
})
