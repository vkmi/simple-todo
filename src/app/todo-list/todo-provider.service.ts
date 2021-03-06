import { Injectable, EventEmitter } from '@angular/core';
import { ITodoItem } from './todoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  [x: string]: any;

  todoList: ITodoItem[] = [];

  instructionsList: ITodoItem[] = [
    {
      id: 0,
      description: 'Uncomplete tasks will always be on top',
      order: 0,
      done: false,
    },
    {
      id: 1,
      description: 'Completing a task will move it down to the completed items',
      order: 1,
      done: false,
    },
    {
      id: 2,
      description: 'Tasks can be dragged to change their order',
      order: 2,
      done: false,
    },
    {
      id: 3,
      description: 'Completed tasks will always be on the bottom',
      order: 3,
      done: true,
    },
    {
      id: 4,
      description: 'Only completed tasks can be deleted, so work hard',
      order: 4,
      done: true,
    },
  ];
  get unfinishedListLength(): number {
    return this.todoList.filter((_) => !_.done).length;
  }
  listChanged: EventEmitter<ITodoItem[]> = new EventEmitter<ITodoItem[]>();

  constructor() {
    this.todoList = this.readListFromLocalStorage();
  }

  pushListUpdate(): void {
    let savedList = localStorage.getItem('todoList');
    if (!savedList) {
      this.todoList = this.instructionsList;
    }
    this.writeListToLocalStorage();
    this.listChanged.emit(this.readListFromLocalStorage());
  }

  addNote(description: string): void {
    let lastId = -1;
    if (this.todoList.length !== 0)
      lastId = Math.max(...this.todoList.map((_) => _.id));

    let newTodo: ITodoItem = {
      id: lastId + 1,
      description: description,
      order: this.unfinishedListLength,
      done: false,
    };
    this.pushDoneDown();
    this.todoList.push(newTodo);

    this.reorderList();
    this.pushListUpdate();
  }

  deleteNote(id: number): void {
    this.todoList = this.todoList.filter((_) => _.id !== id);
    this.reorderList();
    this.pushListUpdate();
  }

  changedStatus(item: ITodoItem): void {
    let index = this.todoList.findIndex((_) => _.id == item.id);
    if (item.done) {
      this.pushDoneDown();
      this.todoList[index].done = item.done;
      this.todoList[index].order = this.unfinishedListLength + 1;
    }
    if (!item.done) {
      this.todoList[index].done = item.done;
      this.todoList[index].order = this.unfinishedListLength - 1;
      this.pushDoneDown();
    }

    this.reorderList();
    this.pushListUpdate();
  }

  updateListOrder(previousIndex: number, newIndex: number): void {
    if (newIndex > previousIndex) {
      this.todoList.forEach((_) => {
        if (_.order > previousIndex && _.order <= newIndex) _.order--;
      });
    }
    if (newIndex < previousIndex) {
      this.todoList.forEach((_) => {
        if (_.order < previousIndex && _.order >= newIndex) _.order++;
      });
    }
    this.todoList[previousIndex].order = newIndex;

    this.reorderList();
    this.pushListUpdate();
  }

  private reorderList(): void {
    this.todoList.sort(this.itemComparer);
    this.todoList = this.todoList.map((_) => {
      _.order = this.todoList.indexOf(_);
      return _;
    });
  }

  private pushDoneDown(): void {
    this.todoList = this.todoList.map((_) => {
      if (_.done) _.order += 1;
      return _;
    });
  }
  private itemComparer(a: ITodoItem, b: ITodoItem): number {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  }

  private readListFromLocalStorage(): ITodoItem[] {
    let notesList = JSON.parse(
      localStorage.getItem('todoList') ?? '[]'
    ) as ITodoItem[];
    return notesList;
  }
  private writeListToLocalStorage(): void {
    let stringifiedList = JSON.stringify(this.todoList);
    localStorage.setItem('todoList', stringifiedList);
  }
}
