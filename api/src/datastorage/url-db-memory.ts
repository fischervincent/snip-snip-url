type ShortenedUrlRecord = {
  longUrl: string;
  slug: string;
};

const longToSlug: Map<string, ShortenedUrlRecord> = new Map();
const slugToLong: Map<string, ShortenedUrlRecord> = new Map();

export const findSlugIfExists = async (url: string): Promise<string | null> => {
  return longToSlug.get(url)?.slug || null;
}

export const findLongUrlFromSlug = async (slug: string): Promise<string | null> => {
  return slugToLong.get(slug)?.longUrl || null;
}

export const storeSlugRecord = async (url: string, slug: string): Promise<void> => {
  const record: ShortenedUrlRecord = { longUrl: url, slug };
  longToSlug.set(url, record);
  slugToLong.set(slug, record);
}

// I don't want this function to be there... But running out of time.
export const clearDataStorage = (): void => {
  longToSlug.clear();
}
