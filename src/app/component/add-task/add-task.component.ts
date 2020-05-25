import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$;
  }

  onChangeTaskStatus(task: Task) {
    this.taskService.changeTaskStatus(task.id, task.isCompleted);
  }

  onEditTask(task: Task) {
    this.taskService.editTask(task.id, task.content);
  }

  onDeleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }
}
