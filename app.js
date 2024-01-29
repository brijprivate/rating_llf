
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
// Connect to MongoDB (replace 'your-mongodb-url' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://evaluation:qwerty555@cluster0.wvibmim.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// API Routes
const projectRoutes = require('./functions/routes/projectRoutes');
const ratingRoutes = require('./functions/routes/ratingRoutes');
const winner = require('./functions/routes/adminRoutes');

app.use('/.netlify/functions/api/projects', projectRoutes);
app.use('/.netlify/functions/api/ratings', ratingRoutes);
app.use('/.netlify/functions/api/winner', winner);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

