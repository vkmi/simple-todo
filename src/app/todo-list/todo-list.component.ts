import { Component, OnInit } from '@angular/core';
import { ITodoItem } from './todoItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList : ITodoItem[] = [];
  newItemDescription: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  addNewTodo() : void{
    let listLength = this.todoList.length;
    let lastId = this
      .todoList
      .sort(_ => _.id)
      .reverse()[0]?.id ?? 0;

    console.log(this.newItemDescription);

    let newTodo : ITodoItem = {
      id: lastId + 1,
      description: this.newItemDescription,
      order: listLength,
      done: false
    };
    this.todoList.push(newTodo);
  }
}
