import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './component/add-task/add-task.component';
import { TaskComponent } from './component/task/task.component';
import { OverviewComponent } from './component/overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TaskComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
