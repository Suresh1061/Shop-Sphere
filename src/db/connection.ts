import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number
}

const connection: connectionObject = {}

export async function connect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database")
    return;
  }
  
  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string)
    connection.isConnected = db.connections[0].readyState

    console.log("Database connected successfully")
  } catch (error) {
    console.log("Database connection error!", error)
    process.exit()
  }
}