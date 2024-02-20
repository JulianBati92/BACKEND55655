import { connect } from "mongoose";

const dbConnection = async () => {
  try {
    await connect(process.env.DB_LINK);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
