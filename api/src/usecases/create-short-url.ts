import { ShortenedUrlRepository } from "../domain/shortened-url-repository";
import { ShortenedUrl, ShortenedUrlFactory } from "../domain/shortened-url";

export class CreateShortUrl {
  constructor(private repo: ShortenedUrlRepository) {}

  async execute(originalUrl: string): Promise<ShortenedUrl> {
    const shortenedUrlAlready = await this.repo.findByUrl(originalUrl);
    if (shortenedUrlAlready) {
      const updatedShortenedUrl = ShortenedUrlFactory.renew(shortenedUrlAlready);
      await this.repo.renew(updatedShortenedUrl.slug, updatedShortenedUrl.expirationDate);
      return updatedShortenedUrl;
    }
    const shortenedUrl: ShortenedUrl = ShortenedUrlFactory.createNew(originalUrl);
    await this.repo.save(shortenedUrl);
    return shortenedUrl;
  }
}
