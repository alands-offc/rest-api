import mongoose from 'mongoose';
import "../config.js"
mongoose.connect(global.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

export default mongoose;
