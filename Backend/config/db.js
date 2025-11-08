const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("🔄 Trying to connect MongoDB...");

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(" MongoDB connection failed:", err.message);
  }
};

module.exports = connectDB;
