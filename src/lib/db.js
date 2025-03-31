import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

// Check if MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

// Check if MongoDB DB is defined
if (!MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable")
}

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Create a new MongoDB client
  const client = new MongoClient(MONGODB_URI)

  // Connect to the MongoDB server
  await client.connect()

  // Get the database
  const db = client.db(MONGODB_DB)

  // Cache the client and db for reuse
  cachedClient = client
  cachedDb = db

  return { client, db }
}

