//initialize variables
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const AdminAuthentication =
	require('./routes/Admin-Routes/AdminAuthentication').router;
const AdminRoutes = require('./routes/Admin-Routes/AdminRoutes');

//Setup Database connection
require('./utils/db');

//setup server
const server = express();

// Helmet
server.use(helmet());

// Client
server.use(express.static('build'));
// server.get('/*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const port = 5000;
server.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});

//For accepting form input
server.use(express.json());
server.use(
	express.urlencoded({
		extended: true,
	}),
);

// Enable cors
server.use(cors());

// Routing
server.use('/', [AdminAuthentication, AdminRoutes]);

server.all('*', (req, res) => {
	res.status(501).statusMessage('Not Implemented');
});
