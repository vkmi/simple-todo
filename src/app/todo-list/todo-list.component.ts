import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo-provider.service';
import { ITask } from './todoItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasklist: ITask[] = [];
  _newTaskDescription: string = '';
  get newTaskDescription(): string {
    return this._newTaskDescription;
  }
  set newTaskDescription(value: string) {
    if (!!value) this.validInput = true;
    else this.validInput = false;
    this._newTaskDescription = value;
  }
  validInput: boolean = false;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.taskList.subscribe(
      (updatedTasklist) => (this.tasklist = updatedTasklist)
    );
    this.todoService.readTaskList();
  }

  addNewTask(): void {
    if (!this._newTaskDescription) return;

    this.todoService.addTask(this._newTaskDescription);

    this.newTaskDescription = '';
  }

  updateListOrder(event: any): void {
    if (event.previousIndex === event.currentIndex) return;

    this.todoService.updateTaskListOrder(event.previousIndex, event.currentIndex);
  }
}
