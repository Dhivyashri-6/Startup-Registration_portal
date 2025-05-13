const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');

router.post('/', async (req, res) => {
  try {
    const startupData = req.body;
    
    // Check if startup name already exists
    const existingStartup = await Startup.findOne({ name: startupData.name });
    if (existingStartup) {
      return res.status(400).json({ message: 'Startup with this name already exists' });
    }
    
    const startup = new Startup(startupData);
    await startup.save();
    res.status(201).json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Error creating startup' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const startups = await Startup.find({ userId: req.params.userId });
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching startups' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching startup' });
  }
});

module.exports = router;