import { PostgresShortenUrlRepository } from "./infrastructure/repositories/postgres-url-repository";
import { createApp } from "./server";

const PORT = process.env.PORT || 3000;
async function startServer() {
  const repo = new PostgresShortenUrlRepository();

  const app = await createApp(repo);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start app:", err);
  process.exit(1);
});
