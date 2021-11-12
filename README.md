# Next.js + Formik + Chakra UI

Project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About

At First project was created to learn **Chakra UI**, then I added **Formik**, and created Sign In and Sign Up forms. When forms were created I've decided to add some backend code using **Next.js** api routes to let user register/login.

I've created simple auth with **jwt tokens** (refresh and access tokens) and cookies to keep user logged in on page refresh.
(Yes I know I shouldn't store user passwords as plain text in DB - I decided not to hash it to make this demo simple.)

User is allowed to:

- login / create new account,
- stay logged in after refreshing the page (_httpOnly cookie_),
- logout,
- delete account.
- display books for authenticated user,
- generate new access token if it has expired.
- user with `admin` role can add books,

Functionalities not implemented yet:

- user with `admin` role can delete books,

## Run project locally:

### Install dependencies:

```bash
npm install
# or
yarn install
```

### Set up your DB:

1. Make sure have PostgreSQL installed.

2. Copy `.env.sample` to `.env` and fill `DATABASE_URL` variable with your database details (You can name your db whatever you want).

In my case it looks like this: `DATABASE_URL="postgresql://postgres:secret123@localhost:5432/testapp?schema=public"`

3. Create `.env.local` file and add secrets for acess and refresh tokens:

```
NEXT_PUBLIC_ACCESS_TOKEN_SECRET=SuperSecretForAccess
NEXT_PUBLIC_REFRESH_TOKEN_SECRET=SuperSecretForRefresh
```

4. Run migration:

```bash
npx prisma migrate dev
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

Your app should be up and ready on [http://localhost:3000](http://localhost:3000).

### Tests:

I've implementend End-to-End using [Cypress](https://www.cypress.io/) framework.

Before running any tests **make sure your postgresql database is up and running**, because test runner will try to fill in sign-(up/in) forms and regsiter/login to the app.

**Run the development server** and open cypress dashboard using npm script:

```bash
npm run cypress:open
# or
yarn cypress:open
```
