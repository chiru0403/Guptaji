import 'dotenv/config';
import { createApp } from './src/app.js';
import { initDb } from './src/db.js';

const port = Number(process.env.PORT) || 5000;
const app = createApp();

await initDb();

const server = app.listen(port, () => {
  console.log(`Gupta Namkin API running at http://localhost:${port}`);
});

server.on('error', (error) => {
  console.error(error.message);
  process.exit(1);
});
