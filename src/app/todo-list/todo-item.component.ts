import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TodoService } from './todo-provider.service';
import { ITask } from './todoItem';

@Component({
  selector: 'app-todo-item',
  template: `
    <div name="row" *ngIf="!task?.completed" cdkDrag>
      <div class="itemRow">
        <div class="description">
          {{ task.description }}
        </div>
        <input
          type="checkbox"
          [(ngModel)]="task.completed"
          (change)="changedCompletionStatus()"
        />
      </div>
      <div class="divider"></div>
    </div>
    <div name="row" *ngIf="task?.completed">
      <div class="itemRow">
        <div class="description completedItem">
          {{ task.description }}
        </div>
        <button (click)="deleteItem()">
          <i class="material-icons">remove_circle</i>
        </button>
        <input
          type="checkbox"
          [(ngModel)]="task.completed"
          (change)="changedCompletionStatus()"
        />
      </div>
      <div class="divider"></div>
    </div>
  `,
  styles: [
    `
      .completedItem {
        color: #40464e !important ;
        text-decoration: line-through;
      }

      .itemRow {
        padding: 5px;
        align-self: stretch;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .description {
        flex: 1 1 auto;
        margin: 0 5px;
        color: lightgray;
      }

      .divider {
        height: 1px;
        background-color: #40464e;
        width: 96%;
        margin-left: 2%;
      }

      .itemRow > button {
        background-color: rgba(0, 0, 0, 0);
        border: 0;
        padding-top: 5px;
      }
      .itemRow > button > i {
        color: red;
        font-size: 15px;
      }
    `,
  ],
})
export class TodoItemComponent implements OnChanges {
  @Input() task: any = null;
  constructor(private todoService: TodoService) {}

  ngOnChanges(): void {}

  changedCompletionStatus(): void {
    this.todoService.changeCompletionStatus(this.task);
  }

  deleteItem(): void {
    this.todoService.deleteTask(this.task.id);
  }
}
