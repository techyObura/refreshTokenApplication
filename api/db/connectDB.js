import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.db_url);

    if (conn) {
      console.log(`Mongo DB connection established: ${conn.connection.host}`);
    } else {
      console.log("could not connect to MongoDB");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
