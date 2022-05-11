import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const mongoClient = new MongoClient(URL);

let db = null;

try {
  await mongoClient.connect();
  db = mongoClient.db("eletrostore-api");
} catch (e) {
  console.error("⚠ Could not connect to MongoDB!");
}

export default db;
