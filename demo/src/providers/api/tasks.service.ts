import { EventEmitter } from 'events'
import { TaskModel } from '../../models/task.model'

export class TasksService {

  static async add (data: any): Promise<any> {
    try {
      const task = new TaskModel(data)
      await task.save()
      return {
        success: true,
        task_id: task['_id']
      }
    } catch (e) {
      return {
        success: false,
        problem: e.message
      }
    }
  }

  static async getById (_id: string): Promise<any> {
    try {
      const task = await TaskModel.findById(_id)
        .lean(true)
      if (task) {
        return {
          success: true,
          task: task
        }
      } else throw new Error('Task not found.')
    } catch (e) {
      return {
        success: false,
        problem: e.message
      }
    }
  }

  static async list (limit: number, skip = 0): Promise<any> {
    try {
      const tasks = await TaskModel.find({})
        .skip(skip)
        .limit(limit)
        .lean(true)
      return {
        success: true,
        tasks: tasks
      }
    } catch (e) {
      return {
        success: false,
        problem: e.message
      }
    }
  }

  static async count (): Promise<any> {
    try {
      const count = await TaskModel.find({})
        .count()
      return {
        success: true,
        count: count
      }
    } catch (e) {
      return {
        success: false,
        problem: e.message
      }
    }
  }

  static async edit (_id: string, data: any): Promise<any> {
    try {
      let task = await TaskModel.findByIdAndUpdate(_id, data)
        .lean(true)
      if (!task) throw new Error('Task not found.')
      return {
        success: true,
        task_id: task['_id']
      }
    } catch (e) {
      return {
        success: false,
        problem: e.message
      }
    }
  }

  static async remove (_id: string): Promise<any> {
    try {
      const task = await TaskModel.findByIdAndRemove(_id)
        .lean(true)
      if (!task) throw new Error('Task not found.')
      return {
        success: true
      }
    } catch (e) {
      return {
        success: false,
        problem: e.message
      }
    }
  }

}
