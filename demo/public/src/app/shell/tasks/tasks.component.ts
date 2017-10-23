import { Component, OnInit } from '@angular/core'
import { ITask } from '../../models/i-task'
import { TaskService } from '../../providers/task/task.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: ITask[] = []

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.taskService.tasksPool.subscribe(newTasks => {
      for (const newTask of newTasks) {
        //console.log(1, '\n', newTask, '\n', newTasks, '\n')
        let exists = false
        for (let i = 0; i < this.tasks.length; i++) {
          //console.log(2, '\n', newTask, '\n', newTasks, '\n', this.tasks[i], '\n', this.tasks)
          if (this.tasks[i]._id === newTask._id) {
            //console.log(3, '\n', newTask, '\n', newTasks, '\n', this.tasks[i], '\n', this.tasks)
            exists = true
            this.tasks[i] = newTask
          }
        }
        if (!exists) {
          //console.log(4, '\n', newTask, '\n', newTasks)
          this.tasks.push(newTask)
        }
      }
    }, err => console.error(`TaskService error: ${err}`))
  }

  edit (task: ITask): void {
    //console.log(task)
    this.taskService.edit(task)
  }

  remove (task: ITask): void {
    this.tasks = this.tasks.filter(t => t !== task)
    this.taskService.remove(task)
  }

  toReadableDate (dateNum: number) {
    if (!dateNum) {
      return 'unknown date'
    }

    const date = new Date(dateNum)

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    let amPm = 'am'
    let hour = date.getHours()
    if (hour >= 12) {
      amPm = 'pm'
    }
    if (hour > 12) {
      hour -= 12
    }

    return `${months[date.getMonth()]} ${date.getDate()} at ${hour}:${date.getMinutes()}${amPm}`
  }
}
