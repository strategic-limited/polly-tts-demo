import express from 'express'
import * as bodyParser from 'body-parser'
import io from 'socket.io'
import http from 'http'
import {SOCKET_MESSAGE_EVENT,socketMessage} from "./events/socketMessage";

export default class Server {
  constructor() {
    this.server = {}
  }

  async start() {
    const app = express();
    this.server = http.createServer(app);
    const socket = io(this.server);

    app.use(
      bodyParser.json()
    )

    socket.on('connection', (io) => {

      socketMessage.on(SOCKET_MESSAGE_EVENT, (message) => {
        io.emit('message',{ message });
      });
    });

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', `*`)
      res.header('Access-Control-Allow-Methods', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      next()
    })

    app.use(require('./router'))

    app.get('/', async (req, res) => {
      res.statusCode = 200;
      res.end(JSON.stringify({app: 'tts - up'}))
    })

    this.server.listen(process.env.PORT, (err) => {
      if (err) {
        return console.log('something bad happened', err)
      }
      console.log(`Starting server on http://localhost:${process.env.PORT} `)
    })
  }

  async stop() {
    await this.server.close()
  }
}
