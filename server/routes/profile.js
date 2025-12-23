const express = require('express');
const { pool } = require('../db/mysql');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/get', auth, async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT age, dob, contact, address FROM user_profiles WHERE user_id = ?',
    [req.user.userId]
  );
  res.json({ profile: rows[0] || {} });
});

router.post('/update', auth, async (req, res) => {
  const { age, dob, contact, address } = req.body;
  await pool.execute(
    'INSERT INTO user_profiles (user_id, age, dob, contact, address) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE age=?, dob=?, contact=?, address=?',
    [req.user.userId, age, dob, contact, address, age, dob, contact, address]
  );
  res.json({ message: 'Profile updated' });
});

module.exports = router;