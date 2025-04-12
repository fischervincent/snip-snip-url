import express, { Request, Response } from 'express';
import { throwIfInvalidUrl, throwIfNoUrl, throwIfShortenUrl } from './url-validation';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.post('/shorten', (req: Request, res: Response) => {
  const { url } = req.body;
  try {
    throwIfNoUrl(url);
    throwIfInvalidUrl(url);
    throwIfShortenUrl(url);
  } catch (err: unknown) {
    const errorMessage = (err as Error).message || "An unknown error occurred.";
    res.status(400).json({ error: errorMessage });
    return;
  }
  res.status(200).json({ shortenedUrl: 'myShortUrl' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;