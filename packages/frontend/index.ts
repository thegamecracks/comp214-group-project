import index from "./src/index.html"

Bun.serve({
    hostname: process.env.BUN_HOST || "localhost",
    routes: {
        "/": index,
    },
})
