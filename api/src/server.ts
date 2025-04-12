import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

// Example of a simple API route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;