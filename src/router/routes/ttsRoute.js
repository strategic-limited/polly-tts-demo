import express from 'express'
import path from 'path'
import { ttsController } from '../../controller/speechTask.controller'


const router = express.Router();
const wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
};
router.post('/test', wrapAsync(async (req, res) => {
  return res.json(await ttsController.createTask(req.body))
}));
router.get('/tts', wrapAsync(async (req, res) => {
  return res.sendFile(path.join(__dirname +  './../../client/index.html'));
}));

module.exports = router;
