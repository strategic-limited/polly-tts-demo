import Server from './server'
import {sqsConsumer} from "./service/consumer";
import Database from "./db";

export class Application {
  async init() {
    this.server = new Server();
    this.database = new Database();
    sqsConsumer();
  }
  async start() {
    try {
      await this.server.start()
      await this.database.connect()
    } catch (e) {
      console.error(e)
    }
  }

  async stop() {
    await this.server.stop()
    await this.database.disconnect()
  }
}
