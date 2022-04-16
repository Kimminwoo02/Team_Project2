import mongoose from 'mongoose';

export default function () {
  mongoose
    .connect(process.env.DB_URI || 'mongodb://localhost:27017/jumunmoa')
    .then(() => console.info('Successfully connected to database.'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
