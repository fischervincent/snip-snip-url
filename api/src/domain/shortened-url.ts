import { generateSlug } from "./generate-slug";

export const SLUG_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export interface ShortenedUrl {
  originalUrl: string;
  slug: string;
  expirationDate: Date;
}

export const ShortenedUrlFactory = {
  createNew: (originalUrl: string): ShortenedUrl => {
    const slug = generateSlug();
    const expirationDate = new Date(Date.now() + SLUG_TTL);
    return { originalUrl, slug, expirationDate };
  },
  renew: (shortenedUrl: ShortenedUrl): ShortenedUrl => {
    return { originalUrl: shortenedUrl.originalUrl, slug: shortenedUrl.slug, expirationDate: new Date(Date.now() + SLUG_TTL) };
  },
  validation: {
    isValidUrlFormat(url: string): boolean {
      try {
        new URL(url);
        return true;
      }
      catch (e) {
        return false;
      }
    },
    isShortenedUrl(url: string, shortenerDomain: string): boolean {
      // to avoid loops we should not allow to short already shortened url
      return url.includes(shortenerDomain)
    }
  }
}