import * as dotenv from "dotenv";
import { connect } from 'mongoose';

dotenv.config();

export async function connectToDatabase() {
  await connect(process.env.DB_CONN_STRING || '');

 
  console.log("Successfully connected to the MongoDB database.");
}
