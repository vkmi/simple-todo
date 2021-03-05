import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo-provider.service';
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
  constructor(private todoService : TodoService) { }

  ngOnInit(): void {
    this.todoList = this.todoService.getNotes();
  }

  addNewTodo() : void{
    if (!this._newItemDescription)
      return;

    this.todoList = this.todoService.addNote(this._newItemDescription);

    this.newItemDescription = '';
  }
}
