const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('./AdminAuthentication');

router.get('/api/admin/products', verifyAdmin, async (req, res) => {
	res.send('OK');
});

module.exports = router;
