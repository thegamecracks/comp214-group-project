import index from "./src/index.html"

const hostname = process.env.BUN_HOST || "localhost"
const port = process.env.BUN_PORT || "3000"

console.log(`Starting frontend on: http://${hostname}:${port}`)
Bun.serve({
    hostname,
    port,
    routes: {
        "/": index,
    },
})
