// cPanel Passenger entry point fallback. Vercel uses api/index.js instead.
const { app, boot } = require("./index.js");

const port = process.env.PORT || 5000;

boot()
  .then(() => {
    app.listen(port, () => {
      console.log(`Koly_Store is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Errors", error);
    process.exit(1);
  });
