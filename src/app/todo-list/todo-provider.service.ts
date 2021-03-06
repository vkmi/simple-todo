import { Injectable, EventEmitter } from '@angular/core';
import { ITodoItem } from './todoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  [x: string]: any;

  todoList: ITodoItem[] = [
    {
      id: 0,
      description: 'First Note',
      order: 0,
      done: false,
    },
    {
      id: 1,
      description: 'Deleted Note',
      order: 1,
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
    let lastId = -1;
    if (this.todoList.length !== 0)
      lastId = Math.max(...this.todoList.map((_) => _.id));

    let newTodo: ITodoItem = {
      id: lastId + 1,
      description: description,
      order: this.undoneListLength,
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
      this.todoList[index].order = this.undoneListLength + 1;
    }
    if (!item.done) {
      this.todoList[index].done = item.done;
      this.todoList[index].order = this.undoneListLength - 1;
      this.pushDoneDown();
    }

    this.reorderList();
    this.pushListUpdate();
  }

  updateListOrder(previousIndex:number, newIndex:number):void{

    if (newIndex > previousIndex){
      this.todoList.forEach(_ => {
        if (_.order > previousIndex && _.order <= newIndex)
          _.order--;
      })
    }
    if (newIndex < previousIndex){
      this.todoList.forEach(_ => {
        if (_.order < previousIndex && _.order >= newIndex)
          _.order++;
      })
    }
    this.todoList[previousIndex].order = newIndex;

    this.reorderList();
    this.pushListUpdate();
  }

  private reorderList(): void{
    this.todoList.sort(this.itemComparer);
    this.todoList = this.todoList.map(_ => {_.order = this.todoList.indexOf(_); return _});
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
