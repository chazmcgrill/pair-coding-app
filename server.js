const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

const subjects = require('./backend/routes/subjects');

// Setup for CORS
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Use Routes
app.use('/api/subjects', subjects);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});


// Connect to Mongo
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));