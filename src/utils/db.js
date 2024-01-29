import { connect } from "mongoose";

const dbConnection = async () => {
  try {
    const uri = "mongodb+srv://julianbati92:Juli1992!@cluster0.z3igizd.mongodb.net/";
    await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default dbConnection;
