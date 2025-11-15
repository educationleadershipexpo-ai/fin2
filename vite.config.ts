
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import glob from 'glob';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Find all HTML files in the root directory
const htmlFiles = glob.sync('*.html');

// Create the input object for Rollup
const rollupInput = htmlFiles.reduce((acc, file) => {
    const name = path.basename(file, '.html');
    acc[name] = path.resolve(__dirname, file);
    return acc;
}, {});


export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        rollupOptions: {
          input: rollupInput
        },
      },
      plugins: [],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
