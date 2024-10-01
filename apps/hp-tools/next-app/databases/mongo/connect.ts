import { MongoClient } from "mongodb";

let cachedClient = null;

export async function connectToDatabase(uri = process.env.DATABASE_URL) {
  if (cachedClient) {
    return cachedClient.db("sale_web");
  }
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new MongoClient(uri, options);
  try {
    await client.connect();
    const db = client.db("sale_web");
    cachedClient = client;
    console.log("Connected to MongoDB");
    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
}

export async function closeConnectToDatabase(uri = process.env.DATABASE_URL) {
  try {
    if (cachedClient) {
      await cachedClient.client.close();
      cachedClient = null;
    }
  } catch (err) {
    console.error("Error close connect to MongoDB", err);
    throw err;
  }
}
