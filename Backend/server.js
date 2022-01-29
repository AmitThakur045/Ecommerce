const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handle uncaughtException
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Config
dotenv.config({ path: "Backend/config/config.env" });

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("Unhandled promise rejection", err.message);
  console.log(`Shutting down...`);

  server.close(() => {
    process.exit(1);
  });
});
