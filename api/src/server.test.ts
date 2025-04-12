import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';

import app from './server';
import { afterEach } from 'node:test';
import { clearDataStorage } from './datastorage/url-db-memory';

vi.mock('./generate-slug', () => ({
  generateSlug: vi.fn(() => '00001111')
}));

afterEach(() => {
  clearDataStorage();
});

describe('POST /shorten', () => {
  it('returns 400 if no url in body', async () => {
    const response = await request(app).post('/shorten').send({})
    expect(response.status).toBe(400);
  });
  it('returns 400 if url is not an url', async () => {
    const response = await request(app).post('/shorten').send(
      { url: 'not a url' }
    )
    expect(response.status).toBe(400);
  });
  it('returns 400 if url is already shortened', async () => {
    const response = await request(app).post('/shorten').send(
      { url: 'localhost:3000/aaa' }
    )
    expect(response.status).toBe(400);
  });
  it('returns 400 if url is already shortened', async () => {
    const response = await request(app).post('/shorten').send(
      { url: 'localhost:3000/aaa' }
    )
    expect(response.status).toBe(400);
  });
  it('returns 200 and shortened url if url is valid', async () => {
    const response = await request(app).post('/shorten').send(
      { url: 'https://www.google.com' }
    )
    expect(response.status).toBe(200);
    expect(response.body.shortenedUrl).toBe('localhost:3000/00001111');
  });

  it('should redirect to the original URL for a valid slug', async () => {
    const longUrl = 'http://example.com';
    await request(app).post('/shorten').send({ url: longUrl });

    const response = await request(app)
      .get(`/00001111`)
      .expect(302);

    // Check that the Location header is set to the original URL
    expect(response.header['location']).toBe(longUrl);
  });
});
