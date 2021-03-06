import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TodoService } from './todo-provider.service';
import { ITodoItem } from './todoItem';

@Component({
  selector: 'app-todo-item',
  template: `
  <div *ngIf="!!listItem" class="itemRow">
    <div class="description" [ngClass]="{'completedItem':listItem.done}">{{listItem.description}}</div>
    <button *ngIf="listItem.done"(click)="deleteItem()"><i class="material-icons">remove_circle</i></button>
    <input type="checkbox" [(ngModel)]="listItem.done" (change)="notifyChangeDone()"/>
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

  .itemRow > button{
    background-color: rgba(0,0,0,0);
    border:0;

    margin-right: -25px;
    padding-top: 5px;
  }
  .itemRow > button > i{
    color: red;
    font-size:15px;
  }
  `
  ]
})
export class TodoItemComponent implements OnChanges {
  @Input() listItem : any = null;
  constructor(private todoService : TodoService) {

   }

  ngOnChanges(): void {

  }

  notifyChangeDone(): void{
    this.todoService.changedStatus(this.listItem);
  }

  deleteItem(): void{
    this.todoService.deleteNote(this.listItem.id);
  }
}
