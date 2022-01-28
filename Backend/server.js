const app = require("./app");
const dotenv = require('dotenv');

// Config
dotenv.config({ path: 'Backend/config/config.env' });

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});