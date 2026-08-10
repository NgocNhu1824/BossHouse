// https://vite.dev/config/
export default {
  esbuild: {
    jsx: 'automatic'
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
