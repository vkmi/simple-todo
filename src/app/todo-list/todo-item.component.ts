import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ITodoItem } from './todoItem';

@Component({
  selector: 'app-todo-item',
  template: `
  <div *ngIf="!!listItem" class="itemRow">
    <div class="description" [ngClass]="{'completedItem':listItem.done}">{{listItem.description}}</div>
    <input class="checkbox" type="checkbox" [(ngModel)]="listItem.done"/>
  </div>
  <div class="divider"></div>

  `,
  styles: [`
  .completedItem{
    color: #40464e !important ;
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
    margin: 0 5px;
    max-width: min(40vw, 450px);
    color: lightgray;
  }

  .divider{
    height:1px;
    background-color: #40464e;
    width: 96%;
    margin-left:2%;
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
