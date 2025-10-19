const mongoose=require("mongoose");
const dbConnect="mongodb+srv://cinearchieve_db_user:Ankitpaul1234@moviecluster.efzgd2i.mongodb.net/movieDatabase";
// db.js

const connectDB = async () => {
  try {
    await mongoose.connect(dbConnect,);

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;



