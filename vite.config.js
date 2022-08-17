import { defineConfig } from "vite";
import VitePluginVue from "@vitejs/plugin-vue";
import VitePluginMarkdown from "vite-plugin-md";
import VitePluginVueComponents from "unplugin-vue-components/vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  build: {
    rollupOptions: {
      input: __dirname + "/entrypoints/client.js"
    }
  },
  plugins: [
    VitePluginVue({
      include: [/\.vue$/, /\.md$/]
    }),
    VitePluginMarkdown(),
    VitePluginVueComponents({
      dirs: ["components"],
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.md$/]
    })
  ]
});
