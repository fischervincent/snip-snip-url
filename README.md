# How to install and run

1. ```npm install```
2. ```npm run db:start``` > it will start a docker project named vincenfischer with a postgres container
3. ```npm run db:migrate:up``` > to create the postgres table
4. ```npm run dev``` > run concurrently the vite react app and the express api

# Requirements

- Node 20
- Docker

# Clean after use

You can tear down the docker project with:
```bash
npm run docker:clean
```