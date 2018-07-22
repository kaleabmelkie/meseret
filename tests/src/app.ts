import { ServerApp } from '../../lib'

new ServerApp({
  name: 'Hi',
  httpServers: [{ port: 3000 }]
})
  .start()
  .then(() => console.log('success'))
  .catch(console.error)
