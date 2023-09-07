import mongoose from "mongoose";

class DatabaseConnection {
  connect() {
    mongoose
      .connect(process.env.MONGO_URL)
      .then((database) => {
        console.log("Connected to db", database.connection.host);
      })
      .catch((error) =>
        console.error("\x1b[31m Error connecting to database", error, "\x1b[0m")
      );
  }
}

export default DatabaseConnection;
