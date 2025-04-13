import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import { ShortenedUrlRepository } from "./domain/shortened-url-repository";
import { CreateShortUrl } from "./usecases/create-short-url";
import { GetOriginalUrl } from "./usecases/get-original-url";
import { throwIfInvalidUrl, throwIfNoUrl, throwIfShortenUrl } from "./url-validation";

export async function createApp(repo: ShortenedUrlRepository) {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));

  const createShortUrl = new CreateShortUrl(repo);
  const getOriginalUrl = new GetOriginalUrl(repo);

  app.post("/shorten", async (req, res) => {
    const { url } = req.body;

    try {
      throwIfNoUrl(url);
      throwIfInvalidUrl(url);
      throwIfShortenUrl(url);
    } catch (err) {
      const errorMessage = (err as Error).message || "An unknown error occurred.";
      res.status(400).json({ error: errorMessage });
      return;
    }
    const shortenedUrl = await createShortUrl.execute(url);
    const shortenedUrlResponse = {
      shortenedUrl: `localhost:3000/${shortenedUrl.slug}`,
    };
    res.status(201).json(shortenedUrlResponse);
  });

  app.get("/:slug", async (req, res) => {
    const { slug } = req.params;
    const originalUrl = await getOriginalUrl.execute(slug);
    if (!originalUrl) {
      res.status(404).send("Not found");
      return;
    }
    res.redirect(originalUrl);
  });

  return app;
}