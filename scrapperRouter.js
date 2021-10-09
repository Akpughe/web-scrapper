const express = require('express');
const router = express.Router();
const scrapperController = require('./scraperController')

router.get('/all', scrapperController.getAll)
router.get('/', scrapperController.scrapJobs)
router.get('/yt', scrapperController.scrapVideos)

module.exports = router;