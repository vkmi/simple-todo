import { Injectable, EventEmitter } from '@angular/core';
import { ApiServiceService } from '../simulated-backend/api-service.service';
import { ITask } from './todoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  tasks: ITask[] = [];

  taskList: EventEmitter<ITask[]> = new EventEmitter<ITask[]>();
  constructor(private apiService: ApiServiceService) {}

  getTasks(): void {
    this.taskList.emit(this.apiService.readTasklist());
  }

  addTask(description: string): void {
    this.tasks = this.apiService.createTask(description);
    this.getTasks();
  }

  deleteTask(id: number): void {
    this.tasks = this.apiService.deleteTask(id);
    this.getTasks();
  }

  updateTask(item: ITask): void {
    this.tasks = this.apiService.updateTaskCompletionStatus(item);
    this.getTasks();
  }

  updateTasksOrder(previousIndex: number, newIndex: number): void {
    this.tasks = this.apiService.updateTasklistOrder(previousIndex, newIndex);
    this.getTasks();
  }

  clearList(): ITask[] {
    this.todoList = this.apiService.clearList();
    this.getTasks();
  }
}
