# Real Tech Server

Express/MongoDB backend for the Real Tech e-commerce frontend.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from `.env.example` and fill in the required values.

3. Start the server:

   ```bash
   npm start
   ```

The server runs on the port configured in `.env` (default `5000`).

## Notes

- Uploaded files are stored in `uploads/` at runtime and are not committed.
- `.env` is ignored by git; never commit real credentials.

## Deploying to Vercel

The app is serverless-ready: `api/index.js` exports the Express handler, and
`vercel.json` rewrites every path to it. `index.js` still starts a normal
listener when run directly (`npm start`), so local development is unchanged.

1. Import the repository in Vercel. The git root is this folder, so the default
   Root Directory is correct and no build command is needed.
2. Add these environment variables in **Project → Settings → Environment Variables**:

   | Variable | Required | Notes |
   | --- | --- | --- |
   | `MONGODB_URI` | Yes | Full Atlas connection string |
   | `DB_NAME` | Yes | e.g. `TechTrade` |
   | `ACCESS_TOKEN_SECRET` | Yes | Long random string |
   | `CLIENT_URL` / `FRONTEND_URL` | Yes | Public frontend origin |
   | `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | Yes | Uploads are not persisted on Vercel |
   | `NODEMAILER_USER` / `NODEMAILER_PASS` | Optional | Email is skipped if unset |
   | `MAIL_FROM`, `ADMIN_EMAIL`, `SMTP_*`, `DEEPL_API_KEY` | Optional | Same meaning as `.env.example` |

3. In MongoDB Atlas, allow Vercel's dynamic IPs (`0.0.0.0/0`, or an Atlas
   private endpoint). Serverless functions do not have fixed egress IPs.
4. Point the frontend's `VITE_API_URL` at the Vercel domain.

Vercel limits: request bodies above **4.5 MB** are rejected (uploads are capped
at 4 MB), and the filesystem is read-only except `/tmp`, which is per-instance.
Cloudinary is therefore required in production — `/uploads/<file>` URLs only
resolve for images that exist inside the deployment.
