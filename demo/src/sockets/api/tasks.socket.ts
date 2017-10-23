import * as sio from 'socket.io'
import { TasksService } from '../../providers/api/tasks.service'

const TasksSocket = sio()
const io = TasksSocket.of('/api/task')

// on connection
io.on('connection', socket => {
  console.log(`Socket.IO connected at namespace '${ io.name }'.`)

  // on count
  socket.on('count', async () => {
    socket.emit('count', await TasksService.count())
  })

  // on list
  socket.on('list', async (limit, skip) => {
    socket.emit('list', await TasksService.list(limit, skip))
  })

  // on get
  socket.on('get', async _id => {
    socket.emit('get', await TasksService.getById(_id))
  })

  // on add
  socket.on('add', async data => {
    io.emit('change', await TasksService.add(data))
  })

  // on edit
  socket.on('edit', async (_id, data) => {
    io.emit('change', await TasksService.edit(_id, data))
  })

  // on edit
  socket.on('remove', async (_id) => {
    io.emit('change', await TasksService.remove(_id))
  })
})

export { TasksSocket }
