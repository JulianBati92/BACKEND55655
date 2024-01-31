import { connect } from "mongoose";

const dbConnection = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default dbConnection;
