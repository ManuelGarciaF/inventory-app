import * as http from 'http'

import app from './app'
import * as debugModule from 'debug'

const debug = debugModule('inventory-app:server')

const port = normalizePort(process.env.PORT ?? '3000')
app.set('port', port)

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server
  .on('error', onError)
  .on('listening', onListening)

function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}

function onError(error: Error & { syscall: string, code: string }): void {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = (typeof port === 'string')
    ? `Pipe ${port.toString()}`
    : `Port ${port.toString()}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening(): void {
  const addr = server.address()
  if (addr === null) return
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}
