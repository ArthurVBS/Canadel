import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '%': path.resolve(__dirname, 'test'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['test/**/*.spec.ts'],
    setupFiles: ['./test/vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'cobertura', 'html', 'json-summary'],
      exclude: ['node_modules/', 'dist/', 'test/', 'vite.config.ts', '**/*.d.ts'],
      reportsDirectory: 'coverage',
    },
    reporters: ['default', 'junit'],
    outputFile: 'coverage/junit-report.xml',
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
});
