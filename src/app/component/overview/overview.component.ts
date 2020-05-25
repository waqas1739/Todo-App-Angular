import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  taskContent: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() { }

  onSubmit() {
    if (this.taskContent.trim() === '') {
      return;
    }
    this.taskService.addTask(this.taskContent);
    this.taskContent = '';
  }
}
