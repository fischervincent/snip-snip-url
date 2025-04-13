import { client } from "../pg";
import { ShortenedUrlRepository } from "../../domain/shortened-url-repository";
import { ShortenedUrl } from "../../domain/shortened-url";

export class PostgresShortenUrlRepository implements ShortenedUrlRepository {
  async save(shortenedUrl: ShortenedUrl): Promise<void> {
    await client.query(
      `INSERT INTO urls (slug, url, expire_at) 
       VALUES ($1, $2, $3)`,
      [shortenedUrl.slug, shortenedUrl.originalUrl, shortenedUrl.expirationDate]
    );
  }

  async findBySlug(slug: string): Promise<ShortenedUrl | null> {
    const query = "SELECT url, expire_at FROM urls WHERE slug = $1";
    const result = await client.query(query, [slug]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return { slug, originalUrl: row.url, expirationDate: row.expire_at };
  }

  async findByUrl(originalUrl: string): Promise<ShortenedUrl | null> {
    const query = "SELECT slug, expire_at FROM urls WHERE url = $1";
    const result = await client.query(query, [originalUrl]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return { slug: row.slug, originalUrl, expirationDate: row.expire_at };
  }

  async renew(slug: string, expirationDate: Date): Promise<void> {
    const query = "UPDATE urls SET expire_at = $1 WHERE slug = $2";
    await client.query(query, [expirationDate, slug]);
  }
}
