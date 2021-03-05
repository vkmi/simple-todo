import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ITodoItem } from './todoItem';

@Component({
  selector: 'app-todo-item',
  template: `
  <div *ngIf="!!listItem" class="itemRow">
      <!-- <span>id: {{listItem.id}} - </span> -->
      <div class="description" [ngClass]="{'completedItem':listItem.done}">{{listItem.description}}</div>
      <input class="checkbox" type="checkbox" [(ngModel)]="listItem.done"/>
  </div>

  `,
  styles: [`
  .completedItem{
    color: lightgray;
    text-decoration: line-through;
  }

  .itemRow{
    padding: 5px;
    align-self: stretch;


    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .description{
    flex: 1 0 auto;
    max-width: min(40vw, 450px);
  }
  `
  ]
})
export class TodoItemComponent implements OnChanges {
  @Input() listItem : ITodoItem | null = null;
  constructor() {

   }

  ngOnChanges(): void {

  }

}
