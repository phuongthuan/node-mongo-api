const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ReportSystemDB';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ReportSystemTestDB';
} else if (env === 'production') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://phuongthuan:thuannp95@ds253922.mlab.com:53922/node-mongo-api';
}
