import { Injectable, EventEmitter } from '@angular/core';
import { ITodoItem } from './todoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  [x: string]: any;

  todoList: ITodoItem[] = [
    {
      id: 1,
      description: 'First Seed Note',
      order: 1,
      done: false,
    },
    {
      id: 2,
      description: 'Canceled Seed Note',
      order: 2,
      done: true,
    },
  ];
  get undoneListLength(): number {
    return this.todoList.filter((_) => !_.done).length;
  }
  listChanged: EventEmitter<ITodoItem[]> = new EventEmitter<ITodoItem[]>();


  constructor() {}

  pushListUpdate(): void {
    this.listChanged.emit(this.todoList ?? []);
  }

  addNote(description: string): void {
    let lastId = 0;
    if (this.todoList.length !== 0)
      lastId = Math.max(...this.todoList.map((_) => _.id));

    let newTodo: ITodoItem = {
      id: lastId + 1,
      description: description,
      order: this.undoneListLength+1,
      done: false,
    };
    this.pushDoneDown();
    this.todoList.push(newTodo);

    this.reorderList();
    this.pushListUpdate();
  }

  deleteNote(id: number): void{

    this. todoList = this.todoList.filter(_ => _.id !== id);
    this.reorderList();
    this.pushListUpdate();
  }

  changedStatus(item: ITodoItem): void {
    let index = this.todoList.findIndex((_) => _.id == item.id);
    if (item.done) {
      this.pushDoneDown();
      this.todoList[index].done = item.done;
      this.todoList[index].order = this.undoneListLength + 2;
    }
    if (!item.done) {
      this.todoList[index].done = item.done;
      this.todoList[index].order = this.undoneListLength;
      this.pushDoneDown();
    }

    this.reorderList();
    this.pushListUpdate();
  }

  private reorderList(): void{
    this.todoList.sort(this.itemComparer);
    this.todoList = this.todoList.map(_ => {_.order = this.todoList.indexOf(_)+1; return _});
  }

  private pushDoneDown(): void {
    this.todoList = this.todoList.map((_) => {
      if (_.done) _.order += 1;
      return _;
    });
  }
  private pushDoneUp(): void {
    this.todoList = this.todoList.map((_) => {
      if (_.done) _.order -= 1;
      return _;
    });
  }
  private itemComparer(a: ITodoItem, b: ITodoItem): number {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  }
}
