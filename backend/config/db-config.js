import mongoose from "mongoose";

const connectMongoDB = async () => {
  const dbURL = process.env.DATABASE_URL;

  if (!dbURL) {
    console.error("❌ DATABASE_URL is not set in environment variables");
    process.exit(1); // Exit with failure
  }

  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectMongoDB;
