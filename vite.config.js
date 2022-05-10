import { defineConfig } from "vite";

export default defineConfig({
    server: {
        hmr: {
            protocol: "ws"
        }
    }
})