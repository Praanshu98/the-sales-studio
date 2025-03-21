import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
});
