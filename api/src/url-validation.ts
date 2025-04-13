import { ShortenedUrlFactory } from "./domain/shortened-url";

export const throwIfNoUrl = (url: string) => {
  if (!url) {
    throw new Error("Please enter a URL");
  }
}

export const throwIfInvalidUrl = (url: string) => {
  if (!ShortenedUrlFactory.validation.isValidUrlFormat(url)) throw new Error("Please enter a valid URL");
}

export const throwIfShortenUrl = (url: string) => {
  if (ShortenedUrlFactory.validation.isShortenedUrl(url, "localhost:3000")) {
    throw new Error("This URL is already shortened");
  }
}