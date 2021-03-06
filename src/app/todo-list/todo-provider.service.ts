import { Injectable, EventEmitter } from '@angular/core';
import { ApiServiceService } from '../simulated-backend/api-service.service';
import { ITodoItem } from './todoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: ITodoItem[] = [];

  taskList: EventEmitter<ITodoItem[]> = new EventEmitter<ITodoItem[]>();
  constructor(private apiService: ApiServiceService) {}

  readTaskList(): void {
    this.taskList.emit(this.apiService.readNotes());
  }

  addNote(description: string): void {
    this.todoList = this.apiService.createNote(description);
    this.readTaskList();
  }

  deleteNote(id: number): void {
    this.todoList = this.apiService.deleteNote(id);
    this.readTaskList();
  }

  changedStatus(item: ITodoItem): void {
    this.todoList = this.apiService.updateNoteStatus(item);
    this.readTaskList();
  }

  updateListOrder(previousIndex: number, newIndex: number): void {
    this.todoList = this.apiService.updateNotesOrder(previousIndex, newIndex);
    this.readTaskList();
  }
}
