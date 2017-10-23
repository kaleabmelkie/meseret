import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule,
  MatToolbarModule
} from '@angular/material'

import { AppRoutingModule } from './app-routing.module'
import { RootComponent } from './shell/root/root.component'
import { AboutComponent } from './shell/about/about.component'
import { TaskService } from './providers/task/task.service'
import { TasksComponent } from './shell/tasks/tasks.component'

@NgModule({
  declarations: [
    RootComponent,
    AboutComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [TaskService],
  bootstrap: [RootComponent]
})
export class AppModule { }
