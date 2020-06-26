import { Application } from './app'

module.exports = async () => {
  try {
    const app = new Application()
    await app.init()
    await app.start()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
