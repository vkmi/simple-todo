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
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.taskList.subscribe(
      (updatedTasklist) => (this.tasklist = updatedTasklist)
    );
    this.todoService.getTasks();
  }

  addNewTask(): void {
    if (!this._newTaskDescription) return;

    this.todoService.addTask(this._newTaskDescription);

    this.newTaskDescription = '';
  }

  updateListOrder(event: any): void {
    if (event.previousIndex === event.currentIndex) return;

    this.todoService.updateTasksOrder(event.previousIndex, event.currentIndex);
  }

  clearList(): void {
    this.todoService.clearList();
  }

  export(): void {
    let text = ""
    this.tasklist.forEach(t => text += t.description + '\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'tasks');
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
