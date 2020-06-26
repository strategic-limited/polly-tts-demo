import express from 'express'
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
  return res.sendFile('/Users/Oba/WebstormProjects/WORK/VEDIDEV/TTS-demo/src/client/index.html');
}));

module.exports = router;
