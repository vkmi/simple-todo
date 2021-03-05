import { Component, OnInit } from '@angular/core';
import { ITodoItem } from './todoItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList : ITodoItem[] = [];
  _newItemDescription: string = "";
  get newItemDescription(): string {
    return this._newItemDescription;
  }
  set newItemDescription(value: string){
      if (!!value)
        this.validInput = true;
      else
        this.validInput = false;
    this._newItemDescription = value;
  };
  validInput: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  addNewTodo() : void{
    if (!this._newItemDescription)
      return;

    let listLength = this.todoList.length;
    let lastId = 0;
    if (this.todoList.length !== 0)
      lastId = Math.max(...this.todoList.map(_ => _.id));

    let newTodo : ITodoItem = {
      id: lastId + 1,
      description: this._newItemDescription,
      order: listLength,
      done: false
    };
    this.todoList.push(newTodo);
    this.newItemDescription = '';
  }
}
