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
const CustomerRoutes = require('./routes/Customer-Routes/CustomerRoutes');

//Setup Database connection
require('./utils/db');

//setup server
const server = express();

// Helmet
server.use(helmet());

// Enable cors
server.use(cors());

//For accepting form input
server.use(express.json());
server.use(
	express.urlencoded({
		extended: true,
	}),
);

// Static files
server.use('/uploads', express.static('uploads'));

// Routing
server.use('/', [AdminAuthentication, AdminRoutes, CustomerRoutes]);

// For all routes that aren't implemented
server.all((err, req, res, next) => {
	console.log(err.stack);
	return res.status(501).send({
		status: 'FAILED',
		message: 'Not Implemented',
	});
});

const port = 5000;
server.listen(port || process.env.PORT, () => {
	console.log(`Server listening on port: ${port} at ${new Date()}`);
});
