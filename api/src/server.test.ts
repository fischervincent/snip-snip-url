import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';  // Supertest for making HTTP requests

import app from './server';  // Import your Express app

describe('GET /api/health', () => {
  it('should return status 200 and a health check message', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
