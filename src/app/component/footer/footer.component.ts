import { Component, OnInit } from '@angular/core';
import { FilterButton, Filter } from 'src/app/models/filter.model';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  filterButton: FilterButton[] = [
    { type: Filter.Todo, label: 'Todo', isActive: true },
    { type: Filter.Deleted, label: 'Deleted', isActive: false },
    { type: Filter.Done, label: 'Done', isActive: false }
  ];

  length: number = 0;
  hasComplete$: Observable<boolean>;
  destroy$: Subject<any> = new Subject<any>();
  test: any;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.hasComplete$ = this.taskService.tasks$.pipe(
      map(tasks => tasks.some(t => t.isCompleted)),
      takeUntil(this.destroy$)
    );

    this.taskService.length$
      .pipe(takeUntil(this.destroy$))
      .subscribe(length => (this.length = length));
  }

  filter(type: Filter) {
    this.taskService.filterTasks(type);
  }

  clearComplete() {
    this.taskService.clearCompleted();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
