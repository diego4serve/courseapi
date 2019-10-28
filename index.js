const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to atlas'))
    .catch((error) => console.log(error))

const app = express();

// Mindlewares
app.use(express.json());

// Routes
const studentsRoutes = require('./routes/students');
const coursesRoutes = require('./routes/courses');

app.use('/api/students', studentsRoutes);
app.use('/api/courses', coursesRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT)