# Employee Gifting MVP

## Docker & Deployment

### Local Docker
To run the application locally with Docker (simulating the production environment):

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`. Data will be persisted in the `./data` directory.

### Deploy to Fly.io

1.  **Install Fly CLI**: Follow instructions at [fly.io/docs/hands-on/install-flyctl](https://fly.io/docs/hands-on/install-flyctl/)
2.  **Launch**: Run `fly launch` in the project root.
    -   It will detect the Dockerfile.
    -   When asked about PostgreSQL/Redis, say **No** (we use SQLite).
3.  **Volumes**: To persist SQLite data, you need to mount a volume.
    -   Update `fly.toml` to mount a volume to `/app/data`.
    -   Create the volume: `fly vol create data_volume --size 1`
    -   Deploy: `fly deploy`

### Development
How to run the development server:


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
