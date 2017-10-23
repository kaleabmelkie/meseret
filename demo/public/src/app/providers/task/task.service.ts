import * as sio from 'socket.io-client'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subscriber } from 'rxjs/Subscriber'
import { ITask } from '../../models/i-task'

@Injectable()
export class TaskService {

  private socketNamespace = '/api/task'
  private socket = sio(this.socketNamespace)

  private subscriber: Subscriber<ITask[]>
  private _tasksPool: Observable<ITask[]> = new Observable<ITask[]>(subscriber => {
    this.subscriber = subscriber
    return () => this.subscriber.unsubscribe()
  })

  constructor () {
    // default events
    this.socket.on('connect', () => console.log(`Socket.IO connected at namespace ${this.socketNamespace}.`))
    this.socket.on('error', err => console.error(`Socket.IO error: ${err}`))

    // app events
    this.socket.on('count', this.onCount)
    this.socket.on('list', this.onList)
    this.socket.on('change', this.onChange)
    this.socket.on('get', this.onGet)
  }

  get tasksPool (): Observable<ITask[]> {
    // start
    this.socket.emit('count')

    // listen
    return this._tasksPool
  }

  private onCount = (res?: any): void => {
    if (res.success && (res.count || res.count === 0) && Number.isInteger(res.count)) {
      this.socket.emit('list', res.count, 0)
    } else if (res.problem) {
      console.error(`TaskService.onCount error: ${res.problem}`)
    } else {
      console.error(`Unknown TaskService.onCount error.`)
    }
  }

  private onList = (res?: any): void => {
    if (res.success && res.tasks && Array.isArray(res.tasks)) {
      this.subscriber.next(res.tasks as ITask[])
    } else if (res.problem) {
      console.error(`TaskService.onList error: ${res.problem}`)
    } else {
      console.error(`Unknown TaskService.onList error.`)
    }
  }

  private onChange = (res?: any): void => {
    if (res.success) {
      if (res.task_id) {
        this.socket.emit('get', res.task_id)
      } else {
        this.socket.emit('count')
      }
    } else if (res.problem) {
      console.error(`TaskService.onChange error: ${res.problem}`)
    } else {
      console.error(`Unknown TaskService.onChange error.`)
    }
  }

  private onGet = (res?: any): void => {
    if (res.success && res.task) {
      this.subscriber.next([res.task as ITask])
    } else if (res.problem) {
      console.error(`TaskService.onChange error: ${res.problem}`)
    } else {
      console.error(`Unknown TaskService.onChange error.`)
    }
  }

  add = (task: ITask): void => {
    this.socket.emit('add', task)
  }

  edit = (task: ITask): void => {
    this.socket.emit('edit', task._id, task)
  }

  remove = (task: ITask): void => {
    this.socket.emit('remove', task._id)
  }
}
