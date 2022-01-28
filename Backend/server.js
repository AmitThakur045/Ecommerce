const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");

// Config
dotenv.config({ path: 'Backend/config/config.env' });

// Connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});