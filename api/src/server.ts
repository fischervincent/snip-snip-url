import express, { Request, Response } from 'express';
import cors from 'cors';

import { throwIfInvalidUrl, throwIfNoUrl, throwIfShortenUrl } from './url-validation';
import { generateSlug } from './generate-slug';
import { findLongUrlFromSlug, findSlugIfExists, storeSlugRecord } from './datastorage/url-db-memory';

const app = express();
const port = 3000;
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.post('/shorten', async (req: Request, res: Response) => {
  const { url } = req.body;

  const buildUrlFromSlug = (slug: string): string => {
    return `localhost:3000/${slug}`;
  }

  try {
    throwIfNoUrl(url);
    throwIfInvalidUrl(url);
    throwIfShortenUrl(url);
  } catch (err: unknown) {
    const errorMessage = (err as Error).message || "An unknown error occurred.";
    res.status(400).json({ error: errorMessage });
    return;
  }
  const slugAlready = await findSlugIfExists(url)
  if (slugAlready) {
    res.status(200).json({ shortenedUrl: buildUrlFromSlug(slugAlready) });
    return;
  }
  const slug = generateSlug();
  const shortenedUrl = `localhost:3000/${slug}`;
  await storeSlugRecord(url, slug);
  res.status(200).json({ shortenedUrl });
});

app.get('/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  const url = await findLongUrlFromSlug(slug);

  if (!url) {
    res.status(404).json({ message: 'URL not found' });
    return
  }

  res.redirect(url);
  return
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;