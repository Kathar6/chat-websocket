import dotenv from "dotenv";
import { bootstrap } from "./server.js";
console.clear();
dotenv.config();

const PORT = process.env.PORT || 8000;

bootstrap(PORT);
