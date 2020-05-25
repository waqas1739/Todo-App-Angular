import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo-App-Angular';
  hasTask$: Observable<boolean>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.fetchFromLocalStorage();
    this.hasTask$ = this.taskService.length$.pipe(map(length => length > 0));
  }
}
