import index from "./index.html"

Bun.serve({
    hostname: process.env.BUN_HOST || "localhost",
    routes: {
        "/": index,
    },
})
