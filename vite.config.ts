import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { loadEnv } from 'vite';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@queries': pathResolve('src/queries'),
        '@': pathResolve('src'),
        src: pathResolve('src'),
      },
    },
    base: '/',
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    server: {
      cors: true,
      port: Number(env.VITE_PORT),
      host: env.VITE_HOST,
    },
  };
});
