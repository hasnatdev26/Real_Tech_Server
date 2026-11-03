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
