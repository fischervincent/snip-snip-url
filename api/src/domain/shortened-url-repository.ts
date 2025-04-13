import { ShortenedUrl } from "./shortened-url";

export interface ShortenedUrlRepository {
  save(shortenedUrl: ShortenedUrl): Promise<void>;
  findBySlug(slug: string): Promise<ShortenedUrl | null>;
  findByUrl(url: string): Promise<ShortenedUrl | null>;
  renew(slug: string, expirationDate: Date): Promise<void>;
}
