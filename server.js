const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();
require('./services/passport');
require('./models/user');

const subjects = require('./routes/subjects');
const authRoutes = require('./routes/auth');

// Setup for CORS
app.use(cors());

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Authentication
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use('/api/subjects', subjects);
app.use('/api/auth', authRoutes);

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));
	
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));