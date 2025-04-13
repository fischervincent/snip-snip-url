import { ShortenedUrlRepository } from "../domain/shortened-url-repository";

export class GetOriginalUrl {
  constructor(private repo: ShortenedUrlRepository) {}

  async execute(shortCode: string): Promise<string | null> {
    const url = await this.repo.findBySlug(shortCode);
    return url?.originalUrl ?? null;
  }
}
