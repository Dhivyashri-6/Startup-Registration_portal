const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');
const RejectedStartup = require('../models/RejectedStartup');

router.get('/startups', async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching startups' });
  }
});

router.put('/startups/:id/approve', async (req, res) => {
  try {
    const startup = await Startup.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Error approving startup' });
  }
});

router.post('/startups/:id/reject', async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    
    // Create rejected startup record
    const rejectedStartup = new RejectedStartup({
      ...startup.toObject(),
      rejectionReason: req.body.rejectionReason,
      originalStartupId: startup._id
    });
    await rejectedStartup.save();
    
    // Remove from startups collection
    await Startup.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Startup rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting startup' });
  }
});

router.get('/rejected-startups', async (req, res) => {
  try {
    const rejectedStartups = await RejectedStartup.find();
    res.json(rejectedStartups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rejected startups' });
  }
});

module.exports = router;