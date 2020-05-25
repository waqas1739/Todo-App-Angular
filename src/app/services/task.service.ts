import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { Filter } from 'src/app/models/filter.model';
import { StorageService } from 'src/app/services/storage.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';


@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private static readonly TaskStorageKey = 'tasks';

    private tasks: Task[];
    private filteredTasks: Task[];
    private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
        0
    );
    private displayTasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<
        Task[]
    >([]);
    private currentFilter: Filter = Filter.Todo;

    tasks$: Observable<Task[]> = this.displayTasksSubject.asObservable();
    length$: Observable<number> = this.lengthSubject.asObservable();

    constructor(private storageService: StorageService) { }

    private updateTask() {
        this.displayTasksSubject.next(this.filteredTasks);
        this.lengthSubject.next(this.tasks.length);
    }

    filterTasks(filter: Filter, isFiltered: boolean = true) {
        this.currentFilter = filter;
        switch (filter) {
            case Filter.Deleted:
                this.filteredTasks = this.tasks.filter(task => !task.isCompleted);
                break;
            case Filter.Done:
                this.filteredTasks = this.tasks.filter(task => task.isCompleted);
                break;
            case Filter.Todo:
                this.filteredTasks = [...this.tasks];
                break;
        }

        this.updateTask();
    }

    fetchFromLocalStorage() {
        this.tasks =
            this.storageService.getValue<Task[]>(TaskService.TaskStorageKey) || [];
        this.filteredTasks = [...this.tasks];
        this.updateTask();
    }

    updateToLocalStorage() {
        this.storageService.setObject(TaskService.TaskStorageKey, this.tasks);
        this.filterTasks(this.currentFilter, false);
        this.updateTask();
    }

    addTask(content: string) {
        const date = new Date(Date.now()).getTime();
        const newTask = new Task(date, content);
        this.tasks.unshift(newTask);
        this.updateToLocalStorage();
    }

    changeTaskStatus(id: number, isCompleted: boolean) {
        const index = this.tasks.findIndex(t => t.id === id);
        const task = this.tasks[index];
        task.isCompleted = isCompleted;
        this.tasks.splice(index, 1, task);
        this.updateToLocalStorage();
    }

    editTask(id: number, content: string) {
        const index = this.tasks.findIndex(t => t.id === id);
        const task = this.tasks[index];
        task.content = content;
        this.tasks.splice(index, 1, task);
        this.updateToLocalStorage();
    }

    deleteTask(id: number) {
        const index = this.tasks.findIndex(t => t.id === id);
        this.tasks.splice(index, 1);
        this.updateToLocalStorage();
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(task => !task.isCompleted);
        this.updateToLocalStorage();
    }
}
