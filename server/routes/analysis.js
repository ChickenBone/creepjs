const express = require('express');
const router = express.Router();
const { saveFingerprint } = require('../database');

router.post('/', async (req, res) => {
  const { fingerprint, profile } = req.body;

  if (!fingerprint || !profile) {
    return res.status(400).json({ error: 'Fingerprint and profile data are required' });
  }

  try {
    const fingerprintId = await saveFingerprint(fingerprint, profile);
    res.status(201).json({ message: 'Fingerprint saved', fingerprintId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save fingerprint' });
  }
});

module.exports = router;
