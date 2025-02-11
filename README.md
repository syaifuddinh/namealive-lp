## Technologies
- Next JS
- Tailwind
- Agora

## How to run locally
- Clone repo
- Copy .env.example in root folder, rename into .env
- Adjust configuration in .env
- run : pnpm dev

## Building website

First, run the build command :

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## Environtment Configuration (.ENV)
There is couple config inside .env

### MODE (DEVELOPMENT/PRODUCTION)
Production mode can secure cookie, hacker or developer can't access cookie in production mode.

### PUBLIC_BASE_URL
URL for public access livestreaming

### BACKEND_AUTH_URL
URL for authentication, including login and registration activities

### BACKEND_MATCH_URL
URL for gaining match functional

## Pages
### Login

### Match management
List match what will be broadcasted

#### Match Detail
Containing match info and function for broadcast host computer

## Repositories
Containing core activites of this platform

### MatchRepo
Managing match activities

### LiveRepo
Manage connection to agora

## Helpers
Containing reusable function, typically for manipulating and extracting value