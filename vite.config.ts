import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { loadEnv } from "vite"

// https://vitejs.dev/config/
// export default defineConfig({
//   // plugins: [react()],
//   // server: {
//   //   open: true,
//   // },
//   // build: {
//   //   outDir: "build",
//   //   sourcemap: true,
//   // },
//   // test: {
//   //   globals: true,
//   //   environment: "jsdom",
//   //   setupFiles: "src/setupTests",
//   //   mockReset: true,
//   // },


// })


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    server: {
      open: true,
    },
    build: {
      outDir: "build",
      sourcemap: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests",
      mockReset: true,
    },
  }
})