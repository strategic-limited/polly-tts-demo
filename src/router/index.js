import express from 'express'

const router = express.Router()

router.use('/', require('./routes/ttsRoute'))

module.exports = router
