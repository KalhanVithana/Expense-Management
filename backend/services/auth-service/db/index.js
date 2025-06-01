import mongoose from 'mongoose';

let isConnected = false; 

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGO_URI not defined');

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
  console.log('MongoDB connected');
};

export default connectDB;
