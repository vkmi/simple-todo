import { Injectable } from '@angular/core';
import { ITask } from '../todo-list/todoItem';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  todoList: ITask[] = [];
  instructionsList: ITask[] = [
    {
      id: 0,
      description: 'Uncomplete tasks will always be on top',
      order: 0,
      completed: false,
    },
    {
      id: 1,
      description: 'Completing a task will move it down to the completed items',
      order: 1,
      completed: false,
    },
    {
      id: 2,
      description: 'Tasks can be dragged to change their order',
      order: 2,
      completed: false,
    },
    {
      id: 3,
      description: 'Completed tasks will always be on the bottom',
      order: 3,
      completed: true,
    },
    {
      id: 4,
      description: 'Only completed tasks can be deleted, so work hard',
      order: 4,
      completed: true,
    },
  ];
  get unfinishedListLength(): number {
    return this.todoList.filter((_) => !_.completed).length;
  }

  constructor() {
    this.todoList = this.readListFromLocalStorage();
  }

  createTask(description: string): ITask[] {
    let lastId = -1;
    if (this.todoList.length !== 0) {
      lastId = Math.max(...this.todoList.map((_) => _.id));
    }
    let newTodo: ITask = {
      id: lastId + 1,
      description: description,
      order: this.unfinishedListLength,
      completed: false,
    };
    this.pushCompletedDown();
    this.todoList.push(newTodo);
    this.reorderList();

    this.writeListToLocalStorage();
    return this.readTasklist();
  }
  readTasklist(): ITask[] {
    let savedList = localStorage.getItem('todoList');
    if (!savedList) {
      this.todoList = this.instructionsList;
    }
    else {
      this.todoList = this.readListFromLocalStorage();
    }
    return this.todoList;
  }
  updateTaskCompletionStatus(item: ITask): ITask[]{
    let index = this.todoList.findIndex((_) => _.id === item.id);
    if (item.completed) {
      this.pushCompletedDown();
      this.todoList[index].completed = item.completed;
      this.todoList[index].order = this.unfinishedListLength + 1;
    }
    if (!item.completed) {
      this.todoList[index].completed = item.completed;
      this.todoList[index].order = this.unfinishedListLength - 1;
      this.pushCompletedDown();
    }
    this.reorderList();

    this.writeListToLocalStorage();
    return this.readTasklist();
  }
  deleteTask(id:number):ITask[]{
    this.todoList = this.todoList.filter((_) => _.id !== id);
    this.reorderList();

    this.writeListToLocalStorage();
    return this.readTasklist();
  }
  updateTasklistOrder(previousIndex: number, newIndex: number): ITask[] {
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
    this.writeListToLocalStorage();
    return this.readTasklist();
  }

  // PRIVATE METHODS
  private reorderList(): void {
    this.todoList.sort(this.itemComparer);
    this.todoList = this.todoList.map((_) => {
      _.order = this.todoList.indexOf(_);
      return _;
    });
  }
  private pushCompletedDown(): void {
    this.todoList = this.todoList.map((_) => {
      if (_.completed) _.order += 1;
      return _;
    });
  }
  private itemComparer(a: ITask, b: ITask): number {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  }
  private readListFromLocalStorage(): ITask[] {
    let notesList = JSON.parse(
      localStorage.getItem('todoList') ?? '[]'
    ) as ITask[];
    return notesList;
  }
  private writeListToLocalStorage(): void {
    let stringifiedList = JSON.stringify(this.todoList);
    localStorage.setItem('todoList', stringifiedList);
  }
}
