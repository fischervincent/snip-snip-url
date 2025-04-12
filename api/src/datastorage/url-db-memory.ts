type ShortenedUrlRecord = {
  longUrl: string;
  shortUrl: string;
};

const longToShort: Map<string, ShortenedUrlRecord> = new Map();

export const findShortenedUrlIfExists = async (url: string) : Promise<string | null> => {
  return longToShort.get(url)?.shortUrl || null;
}

export const storeShortenedUrlRecord = async (url: string, shortenedUrl: string) : Promise<void> => {
  const record: ShortenedUrlRecord = { longUrl: url, shortUrl: shortenedUrl };
  longToShort.set(url, record);
}
