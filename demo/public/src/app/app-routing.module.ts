import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TasksComponent } from './shell/tasks/tasks.component'
import { AboutComponent } from './shell/about/about.component'

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'about', component: AboutComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
