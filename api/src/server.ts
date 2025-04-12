import express, { Request, Response } from 'express';
import { throwIfInvalidUrl, throwIfNoUrl, throwIfShortenUrl } from './url-validation';
import { generateSlug } from './generate-slug';
import { findShortenedUrlIfExists, storeShortenedUrlRecord } from './datastorage/url-db-memory';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.post('/shorten', async (req: Request, res: Response) => {
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
  const urlAlreadyShortened = await findShortenedUrlIfExists(url)
  if (urlAlreadyShortened) {
    res.status(200).json({ shortenedUrl: urlAlreadyShortened });
    return;
  }
  const slug = generateSlug();
  const shortenedUrl = `localhost:3000/${slug}`;
  await storeShortenedUrlRecord(url, shortenedUrl);
  res.status(200).json({ shortenedUrl });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;