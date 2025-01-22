const express = require('express');
const router = express.Router();
const { saveMetric } = require('../database');

router.post('/', async (req, res) => {
  const { fingerprint } = req.body;

  if (!fingerprint) {
    return res.status(400).json({ error: 'Fingerprint data is required' });
  }

  try {
    const metricId = await saveMetric(fingerprint);
    res.status(201).json({ message: 'Metric saved', metricId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save metric' });
  }
});

module.exports = router;
