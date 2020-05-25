import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() changeStatus: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter<Task>();
  isHovered: Boolean = false;
  isEditted: Boolean = false;


  constructor() { }

  ngOnInit(): void { }
  changeTaskStatus() {
    this.changeStatus.emit({
      ...this.task,
      isCompleted: !this.task.isCompleted
    });
  }

  onEditTask() {
    this.editTask.emit(this.task);
    this.isEditted = false;
  }

  onDeleteTask() {
    this.deleteTask.emit(this.task);
  }
}

