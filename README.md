This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running the app
1. Install all required dependencies:

```bash
pnpn install
```
2. Create a `.env.local` file in the root of the project and add a _valid_ Postgres URL.

3. Run migration.
```bash
pnpm migrate
```

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.