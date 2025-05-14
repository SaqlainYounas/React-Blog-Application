import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log("🚀 Server running on port", port);
});