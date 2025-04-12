import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';

import app from './server';

vi.mock('./generate-slug', () => ({
  generateSlug: vi.fn(() => '00001111')
}));

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
});
