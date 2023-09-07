import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then((connection) => {
  console.log("connected to", connection.connection.host);
});
