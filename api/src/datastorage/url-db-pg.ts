import { client } from "./pg";

export const findSlugIfExists = async (url: string): Promise<string | null> => {
  try {
    const result = await client.query(
      'SELECT slug FROM urls WHERE url = $1',
      [url]
    );
    return result.rows[0]?.slug;
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
}

export const findLongUrlFromSlug = async (slug: string): Promise<string | null> => {
  try {
    const result = await client.query(
      'SELECT url FROM urls WHERE slug = $1',
      [slug]
    );
    return result.rows[0]?.url;
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
}

export const storeSlugRecord = async (url: string, slug: string, expire_at: Date): Promise<void> => {
  try {
    const result = await client.query(
      `INSERT INTO urls (slug, url, expire_at) 
       VALUES ($1, $2, $3) 
       RETURNING id, slug, url, expire_at, created_at, click_count`,
      [slug, url, expire_at]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error storing slug record:', err);
    throw err;
  }
}

// I don't want this function to be there... But running out of time.
export const clearDataStorage = async (): Promise<void> => {
  try {
    return client.query('DELETE FROM urls');
  } catch (err) {
    console.error('Error clearing data storage:', err);
    throw err;
  }
}
